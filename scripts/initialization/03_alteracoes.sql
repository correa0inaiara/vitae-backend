alter table questoes rename to perguntas;
alter table perguntas rename column questoesID to perguntasId;
alter table perguntas rename column questao to pergunta;

drop table questionariosRespondidos;

create table respostas (
  respostasID uuid primary key default uuid_generate_v4(),
  perguntasID uuid not null,
  candidaturaID uuid not null,
  resposta text not null,
  horario timestamp not null
);

alter table respostas 
  add constraint fk_perguntas
  foreign key (perguntasID)
  references perguntas (perguntasID);

alter table respostas
  add constraint fk_candidaturas
  foreign key (candidaturaID)
  references candidaturas (candidaturaID);

create table avaliacaoQuestionario (
  avaliacaoQuestionarioID uuid primary key default uuid_generate_v4(),
  questionarioID uuid not null,
  candidaturaID uuid not null,
  avaliacao text not null
);

alter table avaliacaoQuestionario
  add constraint fk_questionario
  foreign key (questionarioID)
  references questionarios (questionarioID);

alter table avaliacaoQuestionario
  add constraint fk_candidatura
  foreign key (candidaturaID)
  references candidaturas (candidaturaID);

alter table agendamentos rename to entrevistas;
alter table entrevistas rename column agendamentoID to entrevistaID;

create table etapas (
  etapasID uuid primary key default uuid_generate_v4(),
  etapa varchar(100) not null
);

alter table processosSeletivos add etapasID uuid;

alter table processosSeletivos
  add constraint fk_etapas
  foreign key (etapasID)
  references etapas (etapasID);

