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

insert into administrador (email, senha) values ('admin@email.com', crypt('123456', gen_salt('bf')));

INSERT INTO usuarios (tipoUsuario, email, senha) VALUES
('Empresa', 'empresa1@email.com', crypt('senha123', gen_salt('bf'))),
('Empresa', 'empresa2@email.com', crypt('senha456', gen_salt('bf'))),
('Candidato', 'candidato1@email.com', crypt('senha789', gen_salt('bf'))),
('Candidato', 'candidato2@email.com', crypt('senha101', gen_salt('bf'))),
('Candidato', 'candidato3@email.com', crypt('senha112', gen_salt('bf'))),
('Empresa', 'empresa3@email.com', crypt('senha131', gen_salt('bf'))),
('Candidato', 'candidato4@email.com', crypt('senha415', gen_salt('bf'))),
('Candidato', 'candidato5@email.com', crypt('senha161', gen_salt('bf'))),
('Empresa', 'empresa4@email.com', crypt('senha718', gen_salt('bf'))),
('Candidato', 'candidato6@email.com', crypt('senha192', gen_salt('bf')));

INSERT INTO empresas (usuarioID, nomeDaEmpresa, cnpj, ramoDaEmpresa, numeroDeFuncionarios, website) VALUES
((SELECT usuarioID FROM usuarios WHERE email = 'empresa1@email.com'), 'Empresa A', '12345678901234', 'Tecnologia', 100, 'www.empresaA.com'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa2@email.com'), 'Empresa B', '23456789012345', 'Consultoria', 50, 'www.empresaB.com'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa3@email.com'), 'Empresa C', '34567890123456', 'Educação', 200, 'www.empresaC.com'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa4@email.com'), 'Empresa D', '45678901234567', 'Saúde', 150, 'www.empresaD.com'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa1@email.com'), 'Empresa E', '56789012345678', 'Varejo', 300, 'www.empresaE.com');

INSERT INTO candidatos (usuarioID, nomeCompleto, cpf, profissao, dataNascimento, carteiraHabilitacao, website) VALUES
((SELECT usuarioID FROM usuarios WHERE email = 'candidato1@email.com'), 'João Silva', '12345678901', 'Engenheiro de Software', '1990-05-15', true, 'www.joaosilva.com'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato2@email.com'), 'Maria Oliveira', '23456789012', 'Designer Gráfico', '1985-08-20', false, 'www.mariaoliveira.com'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato3@email.com'), 'Carlos Souza', '34567890123', 'Analista de Dados', '1992-11-10', true, 'www.carlossouza.com'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato4@email.com'), 'Ana Costa', '45678901234', 'Gerente de Projetos', '1988-03-25', false, 'www.anacosta.com'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato5@email.com'), 'Pedro Rocha', '56789012345', 'Desenvolvedor Front-end', '1995-07-30', true, 'www.pedrorocha.com'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato6@email.com'), 'Fernanda Lima', '67890123456', 'Analista de Marketing', '1991-09-12', false, 'www.fernandalima.com');

INSERT INTO curriculos (usuarioID, nome, descricao) VALUES
((SELECT usuarioID FROM usuarios WHERE email = 'candidato1@email.com'), 'Currículo João Silva', 'Engenheiro de Software com 5 anos de experiência'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato2@email.com'), 'Currículo Maria Oliveira', 'Designer Gráfico com 8 anos de experiência'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato3@email.com'), 'Currículo Carlos Souza', 'Analista de Dados com 3 anos de experiência'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato4@email.com'), 'Currículo Ana Costa', 'Gerente de Projetos com 10 anos de experiência'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato5@email.com'), 'Currículo Pedro Rocha', 'Desenvolvedor Front-end com 4 anos de experiência'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato6@email.com'), 'Currículo Fernanda Lima', 'Analista de Marketing com 6 anos de experiência');

INSERT INTO contatos (usuarioID, tipoContato, contato) VALUES
((SELECT usuarioID FROM usuarios WHERE email = 'candidato1@email.com'), 'Celular', '(11) 98765-4321'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato2@email.com'), 'Telefone', '(21) 1234-5678'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato3@email.com'), 'Celular', '(31) 8765-4321'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato4@email.com'), 'Telefone', '(41) 2345-6789'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato5@email.com'), 'Celular', '(51) 7654-3210'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato6@email.com'), 'Telefone', '(61) 3456-7890'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa1@email.com'), 'Telefone', '(11) 1234-5678'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa2@email.com'), 'Celular', '(21) 98765-4321'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa3@email.com'), 'Telefone', '(31) 2345-6789'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa4@email.com'), 'Celular', '(41) 8765-4321');

INSERT INTO enderecos (usuarioID, cep, logradouro, complemento, numero, bairro, cidade, estado) VALUES
((SELECT usuarioID FROM usuarios WHERE email = 'candidato1@email.com'), '12345-678', 'Rua A', 'Apto 101', '123', 'Centro', 'São Paulo', 'SP'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato2@email.com'), '23456-789', 'Rua B', 'Casa 2', '456', 'Jardim', 'Rio de Janeiro', 'RJ'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato3@email.com'), '34567-890', 'Rua C', 'Apto 202', '789', 'Vila', 'Belo Horizonte', 'MG'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato4@email.com'), '45678-901', 'Rua D', 'Casa 3', '101', 'Centro', 'Curitiba', 'PR'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato5@email.com'), '56789-012', 'Rua E', 'Apto 303', '112', 'Jardim', 'Porto Alegre', 'RS'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato6@email.com'), '67890-123', 'Rua F', 'Casa 4', '131', 'Vila', 'Salvador', 'BA'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa1@email.com'), '78901-234', 'Rua G', 'Sala 101', '415', 'Centro', 'São Paulo', 'SP'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa2@email.com'), '89012-345', 'Rua H', 'Sala 202', '161', 'Jardim', 'Rio de Janeiro', 'RJ'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa3@email.com'), '90123-456', 'Rua I', 'Sala 303', '718', 'Vila', 'Belo Horizonte', 'MG'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa4@email.com'), '01234-567', 'Rua J', 'Sala 404', '192', 'Centro', 'Curitiba', 'PR');

INSERT INTO redesSociais (usuarioID, nomeDaRedeSocial, perfilUsuario) VALUES
((SELECT usuarioID FROM usuarios WHERE email = 'candidato1@email.com'), 'Linkedin', 'joaosilva'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato2@email.com'), 'Instagram', 'mariaoliveira'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato3@email.com'), 'Facebook', 'carlossouza'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato4@email.com'), 'Linkedin', 'anacosta'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato5@email.com'), 'Instagram', 'pedrorocha'),
((SELECT usuarioID FROM usuarios WHERE email = 'candidato6@email.com'), 'Facebook', 'fernandalima'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa1@email.com'), 'Linkedin', 'empresaA'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa2@email.com'), 'Instagram', 'empresaB'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa3@email.com'), 'Facebook', 'empresaC'),
((SELECT usuarioID FROM usuarios WHERE email = 'empresa4@email.com'), 'Linkedin', 'empresaD');

INSERT INTO idiomas (curriculoID, idioma, nivel) VALUES
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Inglês', 'Avançado'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Espanhol', 'Intermediário'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'Inglês', 'Intermediário'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'Inglês', 'Básico'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Ana Costa'), 'Inglês', 'Avançado'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Pedro Rocha'), 'Inglês', 'Intermediário'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Fernanda Lima'), 'Inglês', 'Básico'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Francês', 'Básico'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'Espanhol', 'Básico'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'Alemão', 'Intermediário');

INSERT INTO habilidades (curriculoID, habilidade, nivel) VALUES
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Java', 'Avançado'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Python', 'Intermediário'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'Photoshop', 'Avançado'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'SQL', 'Intermediário'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Ana Costa'), 'Gestão de Projetos', 'Avançado'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Pedro Rocha'), 'React', 'Intermediário'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Fernanda Lima'), 'Marketing Digital', 'Avançado'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Spring Boot', 'Avançado'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'Illustrator', 'Intermediário'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'Power BI', 'Básico');

INSERT INTO educacao (curriculoID, educacao, localizacao, periodoInicial, periodoFinal) VALUES
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Bacharelado em Ciência da Computação', 'Universidade X', '2010-03-01', '2014-12-15'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'Bacharelado em Design Gráfico', 'Universidade Y', '2008-03-01', '2012-12-15'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'Bacharelado em Estatística', 'Universidade Z', '2012-03-01', '2016-12-15'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Ana Costa'), 'MBA em Gestão de Projetos', 'Universidade W', '2015-03-01', '2017-12-15'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Pedro Rocha'), 'Bacharelado em Sistemas de Informação', 'Universidade V', '2013-03-01', '2017-12-15'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Fernanda Lima'), 'Bacharelado em Marketing', 'Universidade U', '2011-03-01', '2015-12-15'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Mestrado em Engenharia de Software', 'Universidade T', '2015-03-01', '2017-12-15'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'Especialização em Design de Interfaces', 'Universidade S', '2013-03-01', '2014-12-15'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'Mestrado em Ciência de Dados', 'Universidade R', '2017-03-01', '2019-12-15'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Ana Costa'), 'Especialização em Gestão Ágil', 'Universidade Q', '2018-03-01', '2019-12-15');

INSERT INTO cursos (curriculoID, curso, localizacao, periodoInicial, periodoFinal, duracaoEmHoras) VALUES
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Curso de Java Avançado', 'Online', '2020-01-15', '2020-03-15', 40),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'Curso de Design de Interfaces', 'Presencial', '2019-05-10', '2019-07-10', 60),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'Curso de Power BI', 'Online', '2021-02-01', '2021-03-01', 30),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Ana Costa'), 'Curso de Gestão Ágil', 'Presencial', '2020-08-15', '2020-10-15', 50),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Pedro Rocha'), 'Curso de React', 'Online', '2021-04-01', '2021-05-01', 40),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Fernanda Lima'), 'Curso de Marketing Digital', 'Presencial', '2019-09-15', '2019-11-15', 60),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Curso de Spring Boot', 'Online', '2021-06-01', '2021-07-01', 30),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'Curso de UX/UI Design', 'Presencial', '2020-03-15', '2020-05-15', 50),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'Curso de Machine Learning', 'Online', '2022-01-10', '2022-03-10', 60),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Ana Costa'), 'Curso de Liderança', 'Presencial', '2021-09-01', '2021-10-01', 20),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Pedro Rocha'), 'Curso de JavaScript Avançado', 'Online', '2022-05-15', '2022-06-15', 40),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Fernanda Lima'), 'Curso de SEO', 'Presencial', '2020-11-01', '2020-12-01', 30),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Curso de Docker', 'Online', '2022-07-01', '2022-08-01', 25),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'Curso de Figma', 'Presencial', '2021-12-15', '2022-01-15', 35),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'Curso de Big Data', 'Online', '2022-09-01', '2022-10-01', 50),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Ana Costa'), 'Curso de Scrum Master', 'Presencial', '2022-03-15', '2022-04-15', 40);

INSERT INTO experiencias (curriculoID, cargo, periodoInicial, periodoFinal, empresa) VALUES
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Desenvolvedor Java', '2015-01-15', '2018-03-15', 'Empresa X'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'Designer Gráfico', '2013-05-10', '2019-07-10', 'Empresa Y'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'Analista de Dados', '2017-02-01', '2021-03-01', 'Empresa Z'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Ana Costa'), 'Gerente de Projetos', '2016-08-15', '2020-10-15', 'Empresa W'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Pedro Rocha'), 'Desenvolvedor Front-end', '2018-04-01', '2022-05-01', 'Empresa V'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Fernanda Lima'), 'Analista de Marketing', '2015-09-15', '2021-11-15', 'Empresa U'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo João Silva'), 'Engenheiro de Software', '2018-06-01', '2022-07-01', 'Empresa T'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Maria Oliveira'), 'UX/UI Designer', '2019-03-15', '2022-05-15', 'Empresa S'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Carlos Souza'), 'Cientista de Dados', '2021-01-10', '2022-03-10', 'Empresa R'),
((SELECT curriculoID FROM curriculos WHERE nome = 'Currículo Ana Costa'), 'Scrum Master', '2020-09-01', '2022-10-01', 'Empresa Q');

INSERT INTO questionarios (empresaID, nome, descricao, prazo) VALUES
((SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa A'), 'Questionário 1', 'Questionário para desenvolvedor Java', '2023-11-01 23:59:59'),
((SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa B'), 'Questionário 2', 'Questionário para designer gráfico', '2023-11-02 23:59:59'),
((SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa C'), 'Questionário 3', 'Questionário para analista de dados', '2023-11-03 23:59:59'),
((SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa D'), 'Questionário 4', 'Questionário para gerente de projetos', '2023-11-04 23:59:59'),
((SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa A'), 'Questionário 5', 'Questionário para desenvolvedor front-end', '2023-11-05 23:59:59'),
((SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa B'), 'Questionário 6', 'Questionário para analista de marketing', '2023-11-06 23:59:59'),
((SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa C'), 'Questionário 7', 'Questionário para engenheiro de software', '2023-11-07 23:59:59'),
((SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa D'), 'Questionário 8', 'Questionário para UX/UI designer', '2023-11-08 23:59:59'),
((SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa A'), 'Questionário 9', 'Questionário para cientista de dados', '2023-11-09 23:59:59'),
((SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa B'), 'Questionário 10', 'Questionário para Scrum Master', '2023-11-10 23:59:59');

INSERT INTO questoes (questionarioID, questao) VALUES
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 1'), 'Quais são os pilares da POO?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 1'), 'Explique o conceito de herança.'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 2'), 'Quais são os princípios do design?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 2'), 'O que é UX/UI?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 3'), 'O que é um banco de dados relacional?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 3'), 'Explique o que é normalização.'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 4'), 'Quais são as fases de um projeto?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 4'), 'O que é um cronograma?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 5'), 'O que é HTML?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 5'), 'Explique o que é CSS.'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 6'), 'O que é marketing digital?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 6'), 'Quais são as principais métricas de marketing?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 7'), 'O que é versionamento de código?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 7'), 'Explique o que é um pull request.'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 8'), 'O que é design responsivo?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 8'), 'Quais são as melhores práticas de UX?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 9'), 'O que é machine learning?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 9'), 'Explique o que é um modelo de regressão.'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 10'), 'O que é Scrum?'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 10'), 'Quais são os papéis no Scrum?');

INSERT INTO questionariosRespondidos (questionarioID, candidatoID) VALUES
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 1'), (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva')),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 2'), (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira')),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 3'), (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza')),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 4'), (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa')),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 5'), (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Pedro Rocha')),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 6'), (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Fernanda Lima')),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 7'), (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva')),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 8'), (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira')),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 9'), (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza')),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 10'), (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa'));

INSERT INTO vagas (tipoContratacaoID, empresaID, questionarioID, nome, descricao, localizacao, salario, prazo, status) VALUES
((SELECT tipoContratacaoID FROM tiposContratacao WHERE contratacao = 'Contrato por Tempo Indeterminado'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa A'), (SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 1'), 'Desenvolvedor Java', 'Desenvolver e manter sistemas em Java', 'São Paulo', '8000.00', '2023-12-31 23:59:59', true),
((SELECT tipoContratacaoID FROM tiposContratacao WHERE contratacao = 'Contrato por Tempo Determinado'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa B'), (SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 2'), 'Designer Gráfico', 'Criar designs para campanhas publicitárias', 'Rio de Janeiro', '5000.00', '2023-11-30 23:59:59', true),
((SELECT tipoContratacaoID FROM tiposContratacao WHERE contratacao = 'Contrato de Trabalho Home Office'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa C'), (SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 3'), 'Analista de Dados', 'Analisar dados e gerar insights', 'Belo Horizonte', '7000.00', '2023-10-31 23:59:59', true),
((SELECT tipoContratacaoID FROM tiposContratacao WHERE contratacao = 'Contrato de Trabalho Temporario'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa D'), (SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 4'), 'Gerente de Projetos', 'Gerenciar projetos de TI', 'Curitiba', '10000.00', '2023-09-30 23:59:59', true),
((SELECT tipoContratacaoID FROM tiposContratacao WHERE contratacao = 'Contrato de Trabalho Home Office'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa A'), (SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 5'), 'Desenvolvedor Front-end', 'Desenvolver interfaces web', 'São Paulo', '7500.00', '2023-08-31 23:59:59', true),
((SELECT tipoContratacaoID FROM tiposContratacao WHERE contratacao = 'Contrato por Tempo Indeterminado'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa B'), (SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 6'), 'Analista de Marketing', 'Planejar e executar campanhas de marketing', 'Rio de Janeiro', '6000.00', '2023-07-31 23:59:59', true),
((SELECT tipoContratacaoID FROM tiposContratacao WHERE contratacao = 'Contrato de Trabalho Temporario'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa C'), (SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 7'), 'Engenheiro de Software', 'Desenvolver e manter sistemas', 'Belo Horizonte', '9000.00', '2023-06-30 23:59:59', true),
((SELECT tipoContratacaoID FROM tiposContratacao WHERE contratacao = 'Contrato de Trabalho Home Office'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa D'), (SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 8'), 'UX/UI Designer', 'Criar interfaces de usuário', 'Curitiba', '6500.00', '2023-05-31 23:59:59', true),
((SELECT tipoContratacaoID FROM tiposContratacao WHERE contratacao = 'Contrato por Tempo Indeterminado'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa A'), (SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 9'), 'Cientista de Dados', 'Analisar e modelar dados', 'São Paulo', '8500.00', '2023-04-30 23:59:59', true),
((SELECT tipoContratacaoID FROM tiposContratacao WHERE contratacao = 'Contrato de Trabalho Temporario'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa B'), (SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 10'), 'Scrum Master', 'Facilitar processos ágeis', 'Rio de Janeiro', '7000.00', '2023-03-31 23:59:59', true);

INSERT INTO candidaturas (candidatoID, vagaID) VALUES
((SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva'), (SELECT vagaID FROM vagas WHERE nome = 'Desenvolvedor Java')),
((SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira'), (SELECT vagaID FROM vagas WHERE nome = 'Designer Gráfico')),
((SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza'), (SELECT vagaID FROM vagas WHERE nome = 'Analista de Dados')),
((SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa'), (SELECT vagaID FROM vagas WHERE nome = 'Gerente de Projetos')),
((SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Pedro Rocha'), (SELECT vagaID FROM vagas WHERE nome = 'Desenvolvedor Front-end')),
((SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Fernanda Lima'), (SELECT vagaID FROM vagas WHERE nome = 'Analista de Marketing')),
((SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva'), (SELECT vagaID FROM vagas WHERE nome = 'Engenheiro de Software')),
((SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira'), (SELECT vagaID FROM vagas WHERE nome = 'UX/UI Designer')),
((SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza'), (SELECT vagaID FROM vagas WHERE nome = 'Cientista de Dados')),
((SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa'), (SELECT vagaID FROM vagas WHERE nome = 'Scrum Master'));

INSERT INTO processosSeletivos (vagaID, empresaID, nome, descricao) VALUES
((SELECT vagaID FROM vagas WHERE nome = 'Desenvolvedor Java'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa A'), 'Processo Seletivo Dev Java', 'Processo seletivo para desenvolvedor Java'),
((SELECT vagaID FROM vagas WHERE nome = 'Designer Gráfico'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa B'), 'Processo Seletivo Designer', 'Processo seletivo para designer gráfico'),
((SELECT vagaID FROM vagas WHERE nome = 'Analista de Dados'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa C'), 'Processo Seletivo Analista de Dados', 'Processo seletivo para analista de dados'),
((SELECT vagaID FROM vagas WHERE nome = 'Gerente de Projetos'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa D'), 'Processo Seletivo Gerente de Projetos', 'Processo seletivo para gerente de projetos'),
((SELECT vagaID FROM vagas WHERE nome = 'Desenvolvedor Front-end'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa A'), 'Processo Seletivo Front-end', 'Processo seletivo para desenvolvedor front-end'),
((SELECT vagaID FROM vagas WHERE nome = 'Analista de Marketing'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa B'), 'Processo Seletivo Marketing', 'Processo seletivo para analista de marketing'),
((SELECT vagaID FROM vagas WHERE nome = 'Engenheiro de Software'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa C'), 'Processo Seletivo Engenheiro', 'Processo seletivo para engenheiro de software'),
((SELECT vagaID FROM vagas WHERE nome = 'UX/UI Designer'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa D'), 'Processo Seletivo UX/UI', 'Processo seletivo para UX/UI designer'),
((SELECT vagaID FROM vagas WHERE nome = 'Cientista de Dados'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa A'), 'Processo Seletivo Cientista de Dados', 'Processo seletivo para cientista de dados'),
((SELECT vagaID FROM vagas WHERE nome = 'Scrum Master'), (SELECT empresaID FROM empresas WHERE nomeDaEmpresa = 'Empresa B'), 'Processo Seletivo Scrum Master', 'Processo seletivo para Scrum Master');

INSERT INTO candidatosSelecionados (candidaturaID, processoSeletivoID) VALUES
((SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva' LIMIT 1) LIMIT 1), (SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Dev Java')),
((SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira' LIMIT 1) LIMIT 1), (SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Designer')),
((SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza' LIMIT 1) LIMIT 1), (SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Analista de Dados')),
((SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa' LIMIT 1) LIMIT 1), (SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Gerente de Projetos')),
((SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Pedro Rocha' LIMIT 1) LIMIT 1), (SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Front-end')),
((SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Fernanda Lima' LIMIT 1) LIMIT 1), (SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Marketing')),
((SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva' LIMIT 1) LIMIT 1), (SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Engenheiro')),
((SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira' LIMIT 1) LIMIT 1), (SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo UX/UI')),
((SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza' LIMIT 1) LIMIT 1), (SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Cientista de Dados')),
((SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa' LIMIT 1) LIMIT 1), (SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Scrum Master'));

INSERT INTO agendamentos (processoSeletivoID, candidatoSelecionadoID, dia, hora, localizacao) VALUES
((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Dev Java'), (SELECT candidatoSelecionadoID FROM candidatosSelecionados WHERE candidaturaID = (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva') LIMIT 1) LIMIT 1), '2023-10-15', '14:00', 'Sala 101, Empresa A'),
((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Designer'), (SELECT candidatoSelecionadoID FROM candidatosSelecionados WHERE candidaturaID = (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira') LIMIT 1) LIMIT 1), '2023-10-16', '15:00', 'Sala 202, Empresa B'),
((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Analista de Dados'), (SELECT candidatoSelecionadoID FROM candidatosSelecionados WHERE candidaturaID = (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza') LIMIT 1) LIMIT 1), '2023-10-17', '10:00', 'Sala 303, Empresa C'),
((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Gerente de Projetos'), (SELECT candidatoSelecionadoID FROM candidatosSelecionados WHERE candidaturaID = (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa') LIMIT 1) LIMIT 1), '2023-10-18', '11:00', 'Sala 404, Empresa D'),
((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Front-end'), (SELECT candidatoSelecionadoID FROM candidatosSelecionados WHERE candidaturaID = (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Pedro Rocha') LIMIT 1) LIMIT 1), '2023-10-19', '09:00', 'Sala 101, Empresa A'),
((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Marketing'), (SELECT candidatoSelecionadoID FROM candidatosSelecionados WHERE candidaturaID = (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Fernanda Lima') LIMIT 1) LIMIT 1), '2023-10-20', '14:00', 'Sala 202, Empresa B'),
((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Engenheiro'), (SELECT candidatoSelecionadoID FROM candidatosSelecionados WHERE candidaturaID = (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva') LIMIT 1) LIMIT 1), '2023-10-21', '16:00', 'Sala 303, Empresa C'),
((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo UX/UI'), (SELECT candidatoSelecionadoID FROM candidatosSelecionados WHERE candidaturaID = (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira') LIMIT 1) LIMIT 1), '2023-10-22', '10:00', 'Sala 404, Empresa D'),
((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Cientista de Dados'), (SELECT candidatoSelecionadoID FROM candidatosSelecionados WHERE candidaturaID = (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza') LIMIT 1) LIMIT 1), '2023-10-23', '13:00', 'Sala 101, Empresa A'),
((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Scrum Master'), (SELECT candidatoSelecionadoID FROM candidatosSelecionados WHERE candidaturaID = (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa') LIMIT 1) LIMIT 1), '2023-10-24', '15:00', 'Sala 202, Empresa B');

INSERT INTO beneficiosOferecidos (vagaID, beneficioID) VALUES
((SELECT vagaID FROM vagas WHERE nome = 'Desenvolvedor Java'), (SELECT beneficioID FROM beneficios WHERE beneficio = 'Vale-alimentação')),
((SELECT vagaID FROM vagas WHERE nome = 'Desenvolvedor Java'), (SELECT beneficioID FROM beneficios WHERE beneficio = 'Assitência Médica')),
((SELECT vagaID FROM vagas WHERE nome = 'Designer Gráfico'), (SELECT beneficioID FROM beneficios WHERE beneficio = 'Vale-refeição')),
((SELECT vagaID FROM vagas WHERE nome = 'Analista de Dados'), (SELECT beneficioID FROM beneficios WHERE beneficio = 'Plano Odontológico')),
((SELECT vagaID FROM vagas WHERE nome = 'Gerente de Projetos'), (SELECT beneficioID FROM beneficios WHERE beneficio = 'Auxílio Educação')),
((SELECT vagaID FROM vagas WHERE nome = 'Desenvolvedor Front-end'), (SELECT beneficioID FROM beneficios WHERE beneficio = 'Participação nos Lucros e Resultados')),
((SELECT vagaID FROM vagas WHERE nome = 'Analista de Marketing'), (SELECT beneficioID FROM beneficios WHERE beneficio = 'Academia')),
((SELECT vagaID FROM vagas WHERE nome = 'Engenheiro de Software'), (SELECT beneficioID FROM beneficios WHERE beneficio = 'Sala de Jogos')),
((SELECT vagaID FROM vagas WHERE nome = 'UX/UI Designer'), (SELECT beneficioID FROM beneficios WHERE beneficio = 'Vale-alimentação')),
((SELECT vagaID FROM vagas WHERE nome = 'Cientista de Dados'), (SELECT beneficioID FROM beneficios WHERE beneficio = 'Assitência Médica'));