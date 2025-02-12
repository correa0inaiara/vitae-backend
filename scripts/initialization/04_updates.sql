select * from etapas;
INSERT INTO etapas (etapa) VALUES
('Selecao dos Perfis'),
('Avaliação dos Questionários'),
('Entrevista'),
('Feedback'),
('Fechamento da Vaga');

-- select * from statusProcesso;
-- INSERT INTO statusProcesso (processoSeletivoID, etapasID) VALUES
-- ((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Dev Java'), (SELECT etapasID FROM etapas WHERE etapa = 'Análise de Currículo')),
-- ((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Designer'), (SELECT etapasID FROM etapas WHERE etapa = 'Teste Técnico')),
-- ((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Analista de Dados'), (SELECT etapasID FROM etapas WHERE etapa = 'Entrevista Inicial')),
-- ((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Gerente de Projetos'), (SELECT etapasID FROM etapas WHERE etapa = 'Entrevista Final')),
-- ((SELECT processoSeletivoID FROM processosSeletivos WHERE nome = 'Processo Seletivo Front-end'), (SELECT etapasID FROM etapas WHERE etapa = 'Avaliação de Fit Cultural'));

update processosSeletivos
set etapasID = etapas.etapasID
from etapas
where etapas.etapa = 'Selecao dos Perfis' 
and nome = 'Processo Seletivo Dev Java';

update processosSeletivos
set etapasID = etapas.etapasID
from etapas
where etapas.etapa = 'Avaliação dos Questionários' 
and nome = 'Processo Seletivo Designer';

update processosSeletivos
set etapasID = etapas.etapasID
from etapas
where etapas.etapa = 'Entrevista' 
and nome = 'Processo Seletivo Analista de Dados';

update processosSeletivos
set etapasID = etapas.etapasID
from etapas
where etapas.etapa = 'Feedback' 
and nome = 'Processo Seletivo Gerente de Projetos';

update processosSeletivos
set etapasID = etapas.etapasID
from etapas
where etapas.etapa = 'Fechamento da Vaga' 
and nome = 'Processo Seletivo Front-end';

update processosSeletivos
set etapasID = etapas.etapasID
from etapas
where etapas.etapa = 'Fechamento da Vaga' 
and nome = 'Processo Seletivo Scrum Master';

update processosSeletivos
set etapasID = etapas.etapasID
from etapas
where etapas.etapa = 'Feedback' 
and nome = 'Processo Seletivo Cientista de Dados';

update processosSeletivos
set etapasID = etapas.etapasID
from etapas
where etapas.etapa = 'Entrevista' 
and nome = 'Processo Seletivo UX/UI';

update processosSeletivos
set etapasID = etapas.etapasID
from etapas
where etapas.etapa = 'Avaliação dos Questionários' 
and nome = 'Processo Seletivo Engenheiro';

update processosSeletivos
set etapasID = etapas.etapasID
from etapas
where etapas.etapa = 'Selecao dos Perfis' 
and nome = 'Processo Seletivo Marketing';

select * from avaliacaoQuestionario;
INSERT INTO avaliacaoQuestionario (questionarioID, candidaturaID, avaliacao) VALUES
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 1'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva') LIMIT 1), 'Excelente desempenho no questionário.'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 2'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira') LIMIT 1), 'Bom entendimento dos conceitos de design.'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 3'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza') LIMIT 1), 'Conhecimento sólido em banco de dados.'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 4'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa') LIMIT 1), 'Ótima compreensão de gestão de projetos.'),
((SELECT questionarioID FROM questionarios WHERE nome = 'Questionário 5'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Pedro Rocha') LIMIT 1), 'Bom domínio de HTML e CSS.');

select * from respostas;
-- Respostas do João Silva para o Questionário 1
INSERT INTO respostas (perguntasID, candidaturaID, resposta, horario) VALUES
((SELECT perguntasID FROM perguntas WHERE pergunta = 'Quais são os pilares da POO?'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva') LIMIT 1), 'Encapsulamento, Herança e Polimorfismo', '2023-10-15 14:00:00'),
((SELECT perguntasID FROM perguntas WHERE pergunta = 'Explique o conceito de herança.'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'João Silva') LIMIT 1), 'Herança permite que uma classe herde atributos e métodos de outra classe.', '2023-10-15 14:05:00');

-- Respostas da Maria Oliveira para o Questionário 2
INSERT INTO respostas (perguntasID, candidaturaID, resposta, horario) VALUES
((SELECT perguntasID FROM perguntas WHERE pergunta = 'Quais são os princípios do design?'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira') LIMIT 1), 'Contraste, Alinhamento, Proximidade e Repetição.', '2023-10-16 15:00:00'),
((SELECT perguntasID FROM perguntas WHERE pergunta = 'O que é UX/UI?'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Maria Oliveira') LIMIT 1), 'UX é a experiência do usuário e UI é a interface do usuário.', '2023-10-16 15:05:00');

-- Respostas do Carlos Souza para o Questionário 3
INSERT INTO respostas (perguntasID, candidaturaID, resposta, horario) VALUES
((SELECT perguntasID FROM perguntas WHERE pergunta = 'O que é um banco de dados relacional?'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza') LIMIT 1), 'Um banco de dados que organiza dados em tabelas relacionadas.', '2023-10-17 10:00:00'),
((SELECT perguntasID FROM perguntas WHERE pergunta = 'Explique o que é normalização.'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Carlos Souza') LIMIT 1), 'Normalização é o processo de organizar dados para reduzir redundâncias e melhorar a integridade.', '2023-10-17 10:05:00');

-- Respostas da Ana Costa para o Questionário 4
INSERT INTO respostas (perguntasID, candidaturaID, resposta, horario) VALUES
((SELECT perguntasID FROM perguntas WHERE pergunta = 'Quais são as fases de um projeto?'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa') LIMIT 1), 'Iniciação, Planejamento, Execução, Monitoramento e Encerramento.', '2023-10-18 11:00:00'),
((SELECT perguntasID FROM perguntas WHERE pergunta = 'O que é um cronograma?'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Ana Costa') LIMIT 1), 'Um cronograma é uma ferramenta que define prazos e atividades de um projeto.', '2023-10-18 11:05:00');

-- Respostas do Pedro Rocha para o Questionário 5
INSERT INTO respostas (perguntasID, candidaturaID, resposta, horario) VALUES
((SELECT perguntasID FROM perguntas WHERE pergunta = 'O que é HTML?'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Pedro Rocha') LIMIT 1), 'HTML é uma linguagem de marcação para criar páginas web.', '2023-10-19 09:00:00'),
((SELECT perguntasID FROM perguntas WHERE pergunta = 'Explique o que é CSS.'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Pedro Rocha') LIMIT 1), 'CSS é uma linguagem de estilo usada para definir a aparência de elementos HTML.', '2023-10-19 09:05:00');

-- Respostas da Fernanda Lima para o Questionário 6
INSERT INTO respostas (perguntasID, candidaturaID, resposta, horario) VALUES
((SELECT perguntasID FROM perguntas WHERE pergunta = 'O que é marketing digital?'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Fernanda Lima') LIMIT 1), 'Marketing digital é a promoção de produtos ou serviços usando canais digitais.', '2023-10-20 14:00:00'),
((SELECT perguntasID FROM perguntas WHERE pergunta = 'Quais são as principais métricas de marketing?'), (SELECT candidaturaID FROM candidaturas WHERE candidatoID = (SELECT candidatoID FROM candidatos WHERE nomeCompleto = 'Fernanda Lima') LIMIT 1), 'CTR, Taxa de Conversão, ROI e CAC.', '2023-10-20 14:05:00');
