const database = require('../infra/database')
const { mapFields, formatDateToDB } = require('../utils/utils');

exports.getQuestionarios = async function () {
	const text = "SELECT * FROM questionarios;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getQuestionarioById = async function (questionarioId) {
	const text = "SELECT * FROM questionarios WHERE questionarioId = $1;"
	const values = [questionarioId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getQuestionario = async function (empresaId) {
	const text = "SELECT * FROM questionarios WHERE empresaId = $1;"
	const values = [empresaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveQuestionario = async function (empresaId, questionario) {
	const text = "INSERT INTO questionarios (empresaId, nome, descricao, prazo) VALUES ($1, $2, $3, $4) returning *"
	const values = [empresaId, questionario.nome, questionario.descricao, questionario.prazo];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateQuestionario = async function(empresaId, questionario) {
	const [text, values] =  mapFields(empresaId, 'questionarioId', questionario, 'questionarios');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteQuestionario = async function (id) {
	const text = "DELETE FROM questionarios WHERE questionarioId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
