const database = require('../infra/database')
const { mapFields } = require('../utils/utils');

exports.getQuestionariosRespondidos = async function () {
	const text = "SELECT * FROM questionariosRespondidos;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getQuestionarioRespondido = async function (questionarioId) {
	const text = "SELECT * FROM questionariosRespondidos WHERE questionarioId = $1;"
	const values = [questionarioId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveQuestionarioRespondido = async function (questionarioId, candidatoId) {
	const text = "INSERT INTO questionariosRespondidos (questionarioId, candidatoId) VALUES ($1, $2) returning *"
	const values = [questionarioId, candidatoId];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateQuestionarioRespondido = async function(id, questionarioId, candidatoId) {
	const obj = { questionarioId, candidatoId }
	const [text, values] =  mapFields(id, 'questionarioRespondidoId', obj, 'questionariosRespondidos');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteQuestionarioRespondido = async function (id) {
	const text = "DELETE FROM questionariosRespondidos WHERE questionarioRespondidoId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
