-- Extensions
create extension if not exists pgcrypto;
create extension "uuid-ossp";

-- Enums
create type estadoENUM as enum (
	'AC', 'AL', 'AP', 'AM', 'BA', 'CE',
	'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
	'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
	'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
	'SP', 'SE', 'TO'
);

create type tipoUsuarioENUM as enum (
	'Empresa', 'Candidato'
);

create type tipoContatoENUM as enum (
	'Celular', 'Telefone'
);

create type tipoRedeSocialENUM as enum (
	'Linkedin', 'Instagram', 'Youtube', 'Facebook', 'Tiktok'
);

create type nivelENUM as enum (
	'Básico', 'Intermediário', 'Avançado'
);

select unnest(enum_range(null::nivelENUM)); 

-- User Tables
create table administrador (
	email text not null unique,
	senha text not null
);

create table usuarios (
	usuarioID uuid primary key default uuid_generate_v4(),
	email varchar(50) not null unique,
	senha varchar(50) not null,
	tipoUsuario tipoUsuarioENUM not null
);

create table contatos (
	contatoID uuid primary key default uuid_generate_v4(),
	usuarioID uuid not null,
	tipoContato	tipoContatoENUM,
	contato character(20)
);

create table enderecos (
	enderecoID uuid primary key default uuid_generate_v4(),
	usuarioID uuid not null,
	cep character(9) not null,
	logradouro varchar(50) not null,
	complemento varchar(100),
	numero character(10) not null,
	bairro varchar(50) not null,
	cidade varchar(50) not null,
	estado estadoENUM not null,
	pais varchar(50) default 'Brasil' not null
);

create table redesSociais (
	redeSocialID uuid primary key default uuid_generate_v4(),
	usuarioID uuid not null,
	nomeDaRedeSocial tipoRedeSocialENUM,
	perfilUsuario varchar(50)
);

create table empresas (
	empresaID uuid primary key default uuid_generate_v4(),
	usuarioID uuid not null,
	nomeDaEmpresa varchar(100) not null,
	cnpj character(14) not null,
	ramoDaEmpresa varchar(50) not null,
	numeroDeFuncionarios int not null,
	website varchar(100)
);

create table candidatos (
	candidatoID uuid primary key default uuid_generate_v4(),
	usuarioID uuid not null,
	nomeCompleto varchar(100) not null,
	cpf character(11) not null,
	profissao text not null,
	dataNascimento date not null,
	carteiraHabilitacao boolean default false not null,
	website varchar(100)
);

create table curriculos (
	curriculoID uuid primary key default uuid_generate_v4(),
	usuarioID uuid not null,
	nome varchar(100) not null,
	descricao varchar(255) not null
);

create table idiomas (
	idiomaID uuid primary key default uuid_generate_v4(),
	curriculoID uuid not null,
	idioma varchar(20) not null,
	nivel nivelENUM not null
);

create table habilidades (
	habilidadeID uuid primary key default uuid_generate_v4(),
	curriculoID uuid not null,
	habilidade varchar(50) not null,
	nivel nivelENUM not null
);

create table educacao (
	educacaoID uuid primary key default uuid_generate_v4(),
	curriculoID uuid not null,
	educacao varchar(50) not null,
	localizacao varchar(50) not null,
	periodoInicial date not null,
	periodoFinal date not null
);

create table cursos (
	cursoID uuid primary key default uuid_generate_v4(),
	curriculoID uuid not null,
	curso varchar(100) not null,
	localizacao varchar(50) not null,
	periodoInicial date not null,
	periodoFinal date not null,
	duracaoEmHoras numeric(3,0) not null 
);

create table experiencias (
	experienciaID uuid primary key default uuid_generate_v4(),
	curriculoID uuid not null,
	cargo varchar(100) not null,	
	periodoInicial date not null,
	periodoFinal date not null,
	empresa varchar(100) not null
);

create table agendamentos (
	agendamentoID uuid primary key default uuid_generate_v4(),
	processoSeletivoID uuid not null,
	candidatoSelecionadoID uuid not null,
	dia date not null,
	hora time not null,
	localizacao varchar(50) not null
);

create table vagas (
	vagaID uuid primary key default uuid_generate_v4(),
	tipoContratacaoID uuid not null,
	empresaID uuid not null,
	questionarioID uuid not null,
	nome varchar(100) not null,
	descricao text not null,
	localizacao varchar(50) not null,
	salario money not null,
	prazo timestamp not null,
	status boolean not null
);

create table candidaturas (
	candidaturaID uuid primary key default uuid_generate_v4(),
	candidatoID uuid not null,
	vagaID uuid not null
);

create table tiposContratacao (
	tipoContratacaoID uuid primary key default uuid_generate_v4(),
	contratacao varchar(30) not null
);

create table beneficios (
	beneficioID uuid primary key default uuid_generate_v4(),
	beneficio varchar(30) not null,
	obrigatorio boolean default true not null
);

--create table test (
--	id uuid primary key default uuid_generate_v4(),
--	test text
--);
--insert into test (test) values ('1');
--insert into test (test) values ('2');
--insert into test (test) values ('3');
--insert into test (test) values ('4');
--insert into test (test) values ('5');
--
--delete from test where id = '480a1492-2b48-4b74-9a27-d41e3efa1a79';
--alter table tiposContratacao alter column tipoContratacaoID set data type uuid using(uuid_generate_v4());

create table beneficiosOferecidos (
	beneficiosOferecidosID uuid primary key default uuid_generate_v4(),
	vagaID uuid not null,
	beneficioID uuid not null
);

create table processosSeletivos (
	processoSeletivoID uuid primary key default uuid_generate_v4(),
	vagaID uuid not null,
	empresaID uuid not null,
	nome varchar(30) not null,
	descricao text not null
);

create table candidatosSelecionados (
	candidatoSelecionadoID uuid primary key default uuid_generate_v4(),
	candidaturaID uuid not null,
	processoSeletivoID uuid not null
);

create table questionarios (
	questionarioID uuid primary key default uuid_generate_v4(),
	empresaID uuid not null,
	nome varchar(30) not null,
	descricao text not null,
	prazo timestamp
);

create table questoes (
	questoesID uuid primary key default uuid_generate_v4(),
	questionarioID uuid not null,
	questao text not null
);

create table questionariosRespondidos(
	questionarioRespondidoID uuid primary key default uuid_generate_v4(),
	questionarioID uuid not null,
	candidatoID uuid not null
);

-- Constraints

alter table contatos
	add constraint fk_usuario
	foreign key (usuarioID)
	references usuarios (usuarioID);

alter table enderecos
	add constraint fk_usuario
	foreign key (usuarioID)
	references usuarios (usuarioID);

alter table redesSociais
	add constraint fk_usuario
	foreign key (usuarioID)
	references usuarios (usuarioID);

alter table candidatos
	add constraint fk_usuario
	foreign key (usuarioID)
	references usuarios (usuarioID);

alter table empresas
	add constraint fk_usuario
	foreign key (usuarioID)
	references usuarios (usuarioID);

alter table curriculos
	add constraint fk_usuario
	foreign key (usuarioID)
	references usuarios (usuarioID);

alter table educacao
	add constraint fk_curriculo
	foreign key (curriculoID)
	references curriculos (curriculoID);

alter table cursos
	add constraint fk_curriculo
	foreign key (curriculoID)
	references curriculos (curriculoID);

alter table experiencias
	add constraint fk_curriculo
	foreign key (curriculoID)
	references curriculos (curriculoID);

alter table habilidades
	add constraint fk_curriculo
	foreign key (curriculoID)
	references curriculos (curriculoID);

alter table idiomas
	add constraint fk_curriculo
	foreign key (curriculoID)
	references curriculos (curriculoID);

alter table vagas
	add constraint fk_empresa
	foreign key (empresaID)
	references empresas (empresaID);

alter table vagas
	add constraint fk_questionario
	foreign key (questionarioID)
	references questionarios (questionarioID);

alter table vagas
	add constraint fk_tipoContratacao
	foreign key (tipoContratacaoID)
	references tiposContratacao (tipoContratacaoID);

alter table processosSeletivos
	add constraint fk_empresa
	foreign key (empresaID)
	references empresas (empresaID);
	
alter table processosSeletivos
	add constraint fk_vagas
	foreign key (vagaID)
	references vagas (vagaID);

alter table beneficiosOferecidos
	add constraint fk_vaga
	foreign key (vagaID)
	references vagas (vagaID);
	
alter table beneficiosOferecidos
	add constraint fk_beneficio
	foreign key (beneficioID)
	references beneficios (beneficioID);
	
alter table questionarios
	add constraint fk_empresa
	foreign key (empresaID)
	references empresas (empresaID);
	
alter table questoes
	add constraint fk_questionario
	foreign key (questionarioID)
	references questionarios (questionarioID);
	
alter table candidaturas
	add constraint fk_candidato
	foreign key (candidatoID)
	references candidatos (candidatoID);

alter table candidaturas
	add constraint fk_vagas
	foreign key (vagaID)
	references vagas (vagaID);

alter table questionariosRespondidos
	add constraint fk_questionario
	foreign key (questionarioID)
	references questionarios (questionarioID);
	
alter table questionariosRespondidos
	add constraint fk_candidato
	foreign key (candidatoID)
	references candidatos (candidatoID);
	
alter table candidatosSelecionados
	add constraint fk_candidatura
	foreign key (candidaturaID)
	references candidaturas (candidaturaID);

alter table candidatosSelecionados
	add constraint fk_processoSeletivo
	foreign key (processoSeletivoID)
	references processosSeletivos (processoSeletivoID);

alter table agendamentos
	add constraint fk_processoSeletivo
	foreign key (processoSeletivoID)
	references processosSeletivos (processoSeletivoID);

alter table agendamentos
	add constraint fk_candidatoSelecionado
	foreign key (candidatoSelecionadoID)
	references candidatosSelecionados (candidatoSelecionadoID);