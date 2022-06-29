const database = require('../infra/database');
const { nivel, nivelENUM } = require('../utils/enums');
const { mapFields, checkType } = require('../utils/utils');

exports.getIdiomas = async function () {
	const text = "SELECT * FROM idiomas;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getIdioma = async function (curriculoId) {
	const text = "SELECT * FROM idiomas WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveIdioma = async function (curriculoId, idioma) {

	const text = "INSERT INTO idiomas (curriculoId, idioma, nivel) VALUES ($1, $2, $3) returning *"
	const values = [curriculoId, idioma.idioma, idioma.nivel];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
        if (error.severity == 'ERROR') throw new Error('Possible error message returned from the database, check stack trace.')
		return error.stack;
	}
}

exports.updateIdioma = async function(idiomaID, idioma) {
	const [text, values] =  mapFields(idiomaID, 'idiomaId', idioma, 'idiomas');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteIdiomaByCurriculo = async function (curriculoId) {
	const text = "DELETE FROM idiomas WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteIdioma = async function (id) {
	const text = "DELETE FROM idiomas WHERE idiomaId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
