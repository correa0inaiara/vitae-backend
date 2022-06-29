const database = require('../infra/database')
const { mapFields, handleDates } = require('../utils/utils');

exports.getTotalUsuariosPorTipo = async function () {
	const text = "SELECT tipousuario, count(*) FROM usuarios GROUP BY tipousuario;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getTotalIdiomasPorNivel = async function () {
	const text = "select idioma, nivel, count(*) from idiomas group by idioma, nivel order by idioma;"
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

exports.getTotalCurriculosQuestionariosVagasProcessosSeletivosAgendamentos = async function () {
	const text = `
		select 'curriculos' as coluna, count(*) from curriculos
		union
		select 'questionarios', count(*) from questionarios
		union
		select 'vagas', count(*) from vagas
		union
		select 'processos seletivos', count(*) from processosseletivos
		union
		select 'agendamentos', count(*) from agendamentos
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
		select e.uf, count(*)
		from enderecos e
		full join usuarios u
		on e.usuarioid = u.usuarioid
		where u.tipousuario = 'Candidato' and e.uf notnull 
		group by e.uf;
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
		select e.uf, count(*)
		from enderecos e
		full join usuarios u
		on e.usuarioid = u.usuarioid
		where u.tipousuario = 'Empresa' and e.uf notnull 
		group by e.uf;
	`
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
