const database = require('../infra/database');
const { nivel, nivelENUM } = require('../utils/enums');
const { mapFields, checkType } = require('../utils/utils');

exports.getHabilidades = async function () {
	const text = "SELECT * FROM habilidades;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getHabilidade = async function (curriculoId) {
	const text = "SELECT * FROM habilidades WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveHabilidade = async function (curriculoId, habilidade) {

	const text = "INSERT INTO habilidades (curriculoId, habilidade, nivel) VALUES ($1, $2, $3) returning *"
	const values = [curriculoId, habilidade.habilidade, habilidade.nivel];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
        if (error.severity == 'ERROR') throw new Error('Possible error message returned from the database, check stack trace.')
		return error.stack;
	}
}

exports.updateHabilidade = async function(habilidadeID, habilidade) {
	const [text, values] =  mapFields(habilidadeID, 'habilidadeId', habilidade, 'habilidades');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteHabilidadeByCurriculo = async function (curriculoId) {
	const text = "DELETE FROM habilidades WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteHabilidade = async function (id) {
	const text = "DELETE FROM habilidades WHERE habilidadeId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
