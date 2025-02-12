-- Beneficios
insert into beneficios (beneficio, obrigatorio) values ('Férias Remuneradas', true);
insert into beneficios (beneficio, obrigatorio) values ('13º Salário', true);
insert into beneficios (beneficio, obrigatorio) values ('Vale-Transporte', true);
insert into beneficios (beneficio, obrigatorio) values ('FGTS', true);
insert into beneficios (beneficio, obrigatorio) values ('Adicional Noturno', true);
insert into beneficios (beneficio, obrigatorio) values ('Vale-alimentação', false);
insert into beneficios (beneficio, obrigatorio) values ('Vale-refeição', false);
insert into beneficios (beneficio, obrigatorio) values ('Assitência Médica', false);
insert into beneficios (beneficio, obrigatorio) values ('Plano Odontológico', false);
insert into beneficios (beneficio, obrigatorio) values ('Auxílio Educação', false);
insert into beneficios (beneficio, obrigatorio) values ('Participação nos Lucros e Resultados', false);
insert into beneficios (beneficio, obrigatorio) values ('Academia', false);
insert into beneficios (beneficio, obrigatorio) values ('Sala de Jogos', false);

-- TiposContratacao
insert into tiposContratacao (contratacao) values ('Contrato por Tempo Determinado');
insert into tiposContratacao (contratacao) values ('Contrato por Tempo Indeterminado');
insert into tiposContratacao (contratacao) values ('Contrato de Trabalho Temporario');
insert into tiposContratacao (contratacao) values ('Contrato de Trabalho Eventual');
insert into tiposContratacao (contratacao) values ('Contrato de Trabalho Home Office');
insert into tiposContratacao (contratacao) values ('Contrato de Trabalho Intermitente');
insert into tiposContratacao (contratacao) values ('Contrato de Trabalho Parcial');
insert into tiposContratacao (contratacao) values ('Contrato de Trabalho Terceirizado');
insert into tiposContratacao (contratacao) values ('Contrato de Trabalho Autonomo');
insert into tiposContratacao (contratacao) values ('Contrato de Trabalho para Estagiario');
insert into tiposContratacao (contratacao) values ('Contrato de Trabalho Trainee');
insert into tiposContratacao (contratacao) values ('Contrato de Trabalho Jovem Aprendiz');

-- Logins
insert into administrador (email, senha) values ('admin@email.com', crypt('123456', gen_salt('bf')));
-- insert into usuarios (tipoUsuario, email, senha) values ('Empresa', 'empresa1@email.com', crypt('123456', gen_salt('bf')));
-- insert into usuarios (tipoUsuario, email, senha) values ('Candidato', 'candidato1@email.com', crypt('123456', gen_salt('bf')));

-- Usuarios
insert into usuarios (tipoUsuario, email, senha) values ('Candidato 1', 'candidato1@email.com', crypt('123', gen_salt('bf')))
insert into usuarios (tipoUsuario, email, senha) values ('Candidato 2', 'candidato2@email.com', crypt('123', gen_salt('bf')))
insert into usuarios (tipoUsuario, email, senha) values ('Candidato 3', 'candidato3@email.com', crypt('123', gen_salt('bf')))
insert into usuarios (tipoUsuario, email, senha) values ('Candidato 4', 'candidato4@email.com', crypt('123', gen_salt('bf')))
insert into usuarios (tipoUsuario, email, senha) values ('Candidato 5', 'candidato5@email.com', crypt('123', gen_salt('bf')))
insert into usuarios (tipoUsuario, email, senha) values ('Candidato 6', 'candidato6@email.com', crypt('123', gen_salt('bf')))
insert into usuarios (tipoUsuario, email, senha) values ('Candidato 7', 'candidato7@email.com', crypt('123', gen_salt('bf')))
insert into usuarios (tipoUsuario, email, senha) values ('Candidato 8', 'candidato8@email.com', crypt('123', gen_salt('bf')))

insert into usuarios (tipoUsuario, email, senha) values ('Empresa 1', 'empresa1@email.com', crypt('123', gen_salt('bf')))
insert into usuarios (tipoUsuario, email, senha) values ('Empresa 2', 'empresa2@email.com', crypt('123', gen_salt('bf')))
insert into usuarios (tipoUsuario, email, senha) values ('Empresa 3', 'empresa3@email.com', crypt('123', gen_salt('bf')))
insert into usuarios (tipoUsuario, email, senha) values ('Empresa 4', 'empresa4@email.com', crypt('123', gen_salt('bf')))

-- Contatos
insert into contatos (usuarioId, tipoContato, contato) values ()