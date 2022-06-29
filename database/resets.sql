drop table if exists usuarios;
drop table if exists contatos;
drop table if exists enderecos;
drop table if exists redesSociais;
drop table if exists candidatos;
drop table if exists empresas;
drop table if exists curriculos;
drop table if exists educacao;
drop table if exists cursos;
drop table if exists idiomas;
drop table if exists habilidades;
drop table if exists experiencias;
drop table if exists processosSeletivos;
drop table if exists candidatosSelecionados;
drop table if exists agendamentos;
drop table if exists vagas;
drop table if exists beneficios;
drop table if exists beneficiosOferecidos;
drop table if exists tiposContratacao;
drop table if exists candidaturas;
drop table if exists questionarios;
drop table if exists questoes;
drop table if exists questionariosRespondidos;


alter table contatos
	drop constraint if exists fk_usuario;

alter table enderecos
	drop constraint if exists fk_usuario;

alter table redesSociais
	drop constraint if exists fk_usuario;

alter table candidatos
	drop constraint if exists fk_usuario;

alter table empresas
	drop constraint if exists fk_usuario;

alter table curriculos
	drop constraint if exists fk_usuario;

alter table educacao
	drop constraint if exists fk_curriculo;

alter table cursos
	drop constraint if exists fk_curriculo;

alter table idiomas
	drop constraint if exists fk_curriculo;

alter table vagas
	drop constraint if exists fk_empresa;

alter table vagas
	drop constraint if exists fk_questionario;

alter table vagas
	drop constraint if exists fk_tipoContratacao;

alter table processosSeletivos
	drop constraint if exists fk_empresa;

alter table processosSeletivos
	drop constraint if exists fk_vagas;

alter table beneficiosOferecidos
	drop constraint if exists fk_beneficio;

alter table beneficiosOferecidos
	drop constraint if exists fk_vaga;

alter table questionarios
	drop constraint if exists fk_empresa;

alter table questoes
	drop constraint if exists fk_questionario;

alter table candidaturas
	drop constraint if exists fk_candidato;

alter table candidaturas
	drop constraint if exists fk_vagas;

alter table questionariosRespondidos
	drop constraint if exists fk_questionario;

alter table questionariosRespondidos
	drop constraint if exists fk_candidato;

alter table candidatosSelecionados
	drop constraint if exists fk_candidatura;

alter table candidatosSelecionados
	drop constraint if exists fk_processoSeletivo;

alter table agendamentos
	drop constraint if exists fk_processoSeletivo;

alter table agendamentos
	drop constraint if exists fk_candidatoSelecionado;

alter table tiposContratacao alter column contratacao type varchar(50);
alter table usuarios alter column senha type varchar(100);
