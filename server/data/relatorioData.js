const database = require('../infra/database')
const { mapFields, handleDates } = require('../utils/utils');


exports.getTotalUsuariosPorTipo = async function () {
	const text = "SELECT roleUsuario, count(*) FROM usuarios GROUP BY roleUsuario;"
	try {
		const res = await database.query(text);
		console.log("res", res)
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getTotalIdiomasPorNivel = async function () {
	// const text = "select idioma, nivel, count(*)::int from idiomas group by idioma, nivel order by idioma;"
	const text = `
		SELECT 
			idioma,
			SUM(CASE WHEN nivel='Básico' THEN 1 ELSE 0 END)::int AS basico,
			SUM(CASE WHEN nivel='Intermediário' THEN 1 ELSE 0 END)::int AS intermediario,
			SUM(CASE WHEN nivel='Avançado' THEN 1 ELSE 0 END)::int AS avancado
		FROM idiomas 
		GROUP BY idioma 
		ORDER BY idioma;
	`
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getTotalEducacaoCursosExperienciasHabilidadesIdiomas = async function () {
	const text = `
		select 'educacao' as coluna, count(*) from educacao
		union
		select 'cursos', count(*) from cursos
		union
		select 'experiencias', count(*) from experiencias
		union
		select 'habilidades', count(*) from habilidades
		union
		select 'idiomas', count(*) from idiomas;
	`
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getTotalCurriculosQuestionariosVagasProcessosSeletivosEntrevistas = async function () {
	const text = `
		select 'curriculos' as coluna, count(*) from curriculos
		union
		select 'questionarios', count(*) from questionarios
		union
		select 'vagas', count(*) from vagas
		union
		select 'processos seletivos', count(*) from processosseletivos
		union
		select 'entrevistas', count(*) from entrevistas
	`
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getTotalCandidatosPorEstado = async function () {
	const text = `
		select e.estado, count(*)
		from enderecos e
		full join usuarios u
		on e.usuarioid = u.usuarioid
		where u.roleUsuario = 'Candidato' and e.estado notnull
		group by e.estado;
	`
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getTotalEmpresasPorEstado = async function () {
	const text = `
		select e.estado, count(*)
		from enderecos e
		full join usuarios u
		on e.usuarioid = u.usuarioid
		where u.roleUsuario = 'Empresa' and e.estado notnull 
		group by e.estado;
	`
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
