const database = require('../infra/database')
const { mapFields } = require('../utils/utils');

exports.getQuestoesRespondidas = async function () {
	const text = "SELECT * FROM questoesRespondidas;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getQuestaoRespondidaByQuestionario = async function (questionarioId) {
	const text = "SELECT * FROM questoesRespondidas WHERE questionarioId = $1;"
	const values = [questionarioId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getQuestaoRespondida = async function (questaoId) {
	const text = "SELECT * FROM questoesRespondidas WHERE questoesId = $1;"
	const values = [questaoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveQuestaoRespondida = async function (questaoId, questionarioId, questaoRespondida) {
	const text = "INSERT INTO questoesRespondidas (questionarioId, questoesId, resposta) VALUES ($1, $2, $3) returning *"
	const values = [questionarioId, questaoId, questaoRespondida.resposta];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateQuestaoRespondida = async function(questoesRespondidasId, questaoRespondida) {
	const [text, values] =  mapFields(questoesRespondidasId, 'questoesRespondidasId', questaoRespondida, 'questoesRespondidas');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteQuestaoRespondida = async function (questoesRespondidasId) {
	const text = "DELETE FROM questoesRespondidas WHERE questoesRespondidasId = $1;"
	const values = [questoesRespondidasId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
