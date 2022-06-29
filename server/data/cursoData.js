const database = require('../infra/database')
const { mapFields } = require('../utils/utils');

exports.getCursos = async function () {
	const text = "SELECT * FROM cursos;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCurso = async function (curriculoId) {
	const text = "SELECT * FROM cursos WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveCurso = async function (curriculoId, curso) {

	const text = "INSERT INTO cursos (curriculoId, curso, localizacao, duracaoEmHoras) VALUES ($1, $2, $3, $4) returning *"
	const values = [curriculoId, curso.curso, curso.localizacao, curso.duracaoEmHoras];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
        if (error.severity == 'ERROR') throw new Error('Possible error message returned from the database, check stack trace.')
		return error.stack;
	}
}

exports.updateCurso = async function(cursoID, cursos) {
	const [text, values] =  mapFields(cursoID, 'cursoId', cursos, 'cursos');
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteCursoByCurriculo = async function (curriculoId) {
	const text = "DELETE FROM cursos WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteCurso = async function (id) {
	const text = "DELETE FROM cursos WHERE cursoId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
