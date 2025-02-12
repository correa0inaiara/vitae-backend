SELECT unnest(enum_range(NULL::roleEnum))::text;
SELECT * FROM usuarios;
SELECT * FROM entrevistas;
select * from candidatos;
select * from empresas;
SELECT roleUsuario, count(*) FROM usuarios GROUP BY roleUsuario;

select idioma, nivel, count(*)::int from idiomas group by idioma, nivel order by nivel;

select 
	idioma,
	SUM(CASE WHEN nivel='Básico' THEN 1 ELSE 0 END)::int AS basico,
	SUM(CASE WHEN nivel='Intermediário' THEN 1 ELSE 0 END)::int AS intermediario,
	SUM(CASE WHEN nivel='Avançado' THEN 1 ELSE 0 END)::int AS avancado
from idiomas 
group by idioma 
order by idioma;