-- relatorios
-- conta todos os usuarios
select count(*) from usuarios;

-- conta os usuarios por tipo
select tipousuario, count(*) from usuarios group by tipousuario;

-- conta a quantidade de curriculos por candidatos
select usuarioid, count(*) from curriculos group by usuarioid;

-- conta a quantidade de questionarios por empresas
select empresaid, count(*) from questionarios group by empresaid;

-- ramos de empresas mais cadastrados
select ramodaempresa , count(*) from empresas group by ramodaempresa order by count(*) desc;

-- vagas por localização
select localizacao, count(*) from vagas group by localizacao order by count(*) desc;

-- conta a quantidade de cursos por curriculo
select curriculoid , count(*) from cursos c  group by curriculoid ;

-- conta a quantidade de experiencias por curriculo
select curriculoid , count(*) from experiencias e  group by curriculoid ;

-- conta a quantidade de habilidades por curriculo
select curriculoid , count(*) from habilidades h  group by curriculoid ;

-- conta o total quantidade de cursos, educacao, experiencias e habilidades
select 'educacao' as educacao, count(*) from educacao
union
select 'cursos' as cursos, count(*) from cursos
union
select 'experiencias' as experiencias, count(*) from experiencias
union
select 'habilidades' as habilidades, count(*) from habilidades
union
select 'idiomas' as habilidades, count(*) from idiomas;

-- conta total de curriculos, questionarios, vagas, processos seletivos e agendamentos
select 'curriculos' as curriculos_questionarios_processosseletivos_questionarios_vagas, count(*) from curriculos
union
select 'questionarios', count(*) from questionarios
union
select 'vagas', count(*) from vagas
union
select 'processos seletivos', count(*) from processosseletivos

-- idiomas mais falados
select idioma, nivel, count(*) from idiomas group by idioma, nivel order by idioma;

-- quantidade de usuairos por estado
select uf, count(*) from enderecos group by uf;

select * from usuarios u where usuarioid = '78ee12bf-cf0d-464b-b340-c2ba73da75b3'
select * from empresas e where empresaid = 'f148ed1e-e795-4655-a02d-249040e7fd6f'

select * from tiposcontratacao t 
select * from beneficios b  


-- candidatos por estado
select e.uf, count(*)
from enderecos e
full join usuarios u
on e.usuarioid = u.usuarioid
where u.tipousuario = 'Candidato' and e.uf notnull 
group by e.uf

-- empresas por estado
select e.uf, count(*)
from enderecos e
full join usuarios u
on e.usuarioid = u.usuarioid
where u.tipousuario = 'Empresa' and e.uf notnull 
group by e.uf