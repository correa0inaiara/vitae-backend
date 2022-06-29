-- Extensions
create extension if not exists pgcrypto;

-- Checks
drop table if exists administrador;
drop table if exists empresas;
drop table if exists candidatos;
--drop table if exists usuarios;
drop table if exists enderecos;
drop table if exists contatos;
drop table if exists logins;
drop table if exists redesSociais;
drop type if exists estadoENUM;

-- Enums
create type estadoENUM as enum (
	'AC', 'AL', 'AP', 'AM', 'BA', 'CE',
	'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
	'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
	'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
	'SP', 'SE', 'TO'
);

-- Tables
create table administrador (
	email text not null unique,
	senha text not null
);

--alter table empresas
--	add constraint fk_endereco
--	foreign key (endereco)
--	references enderecos (enderecoID);

create table enderecos (
	enderecoID serial primary key,
	cep character(9) not null,
	logradouro text not null,
	complemento text,
	numero character(10) not null,
	bairro text not null,
	cidade text not null,
	estado estadoENUM not null,
	pais text not null
);

create table contatos (
	contatoID serial primary key,
	telefone character(20),
	celular character(20),
	email text not null
);

create table redesSociais (
	redeSocialID serial primary key,
	nomeDaRedeSocial text,
	linkPerfilUsuario text
);

create table logins (
	loginID serial primary key,
	email text not null unique,
	senha text not null
);

--create table usuarios (
--	usuariosID serial primary key,
--	endereco integer not null,
--	contatos integer not null,
--	redesSociais integer,
--	login integer not null,
--	website text
--);

--alter table empresas
--	add constraint fk_endereco
--	foreign key (endereco)
--	references enderecos (enderecoID);

create table empresas (
	empresaID serial primary key,
	nomeDaEmpresa text not null,
	cnpj character(14) not null,
	ramoDaEmpresa text not null,
	numeroDeFuncionarios int not null,
	endereco integer not null,
	contatos integer not null,
	redesSociais integer,
	login integer not null,
	website text
);

create table candidatos (
	candidatoID serial primary key,
	nomeCompleto text not null,
	cpf character(11) not null,
	profissao text not null,
	endereco integer not null,
	contatos integer not null,
	redesSociais integer,
	login integer not null,
	website text
);

-- Contraints
-- Empresas
alter table empresas
	add constraint fk_endereco
	foreign key (endereco)
	references enderecos (enderecoID);

alter table empresas
	add constraint fk_contato
	foreign key (contatos)
	references contatos (contatoID);

alter table empresas
	add constraint fk_rede_social
	foreign key (redesSociais)
	references redesSociais (redeSocialID);

alter table empresas
	add constraint fk_login
	foreign key (login)
	references logins (loginID);

-- Candidatos
alter table candidatos
	add constraint fk_endereco
	foreign key (endereco)
	references enderecos (enderecoID);

alter table candidatos
	add constraint fk_contato
	foreign key (contatos)
	references contatos (contatoID);

alter table candidatos
	add constraint fk_rede_social
	foreign key (redesSociais)
	references redesSociais (redeSocialID);

alter table candidatos
	add constraint fk_login
	foreign key (login)
	references logins (loginID);

alter table contatos
	add constraint telefone_ou_celular
		check (telefone is not null or celular is not null);

-- Inserts
insert into administrador (email, senha) values (
	'1224438@sga.pucminas.br', 
	crypt('1224438', gen_salt('bf'))
);

-- Selects
--select * from administrador;
--select * from enderecos;
--select * from contatos;
--select * from logins;
--select * from redesSociais;
----select * from usuarios;
--select * from empresas;
--select * from candidatos;
