const database = require('../infra/database')
const { mapFields, formatDateToDB } = require('../utils/utils');

exports.getQuestoes = async function () {
	const text = "SELECT * FROM questoes;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getQuestao = async function (questionarioId) {
	const text = "SELECT * FROM questoes WHERE questionarioId = $1;"
	const values = [questionarioId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveQuestao = async function (questionarioId, questao) {
	const text = "INSERT INTO questoes (questionarioId, questao) VALUES ($1, $2) returning *"
	const values = [questionarioId, questao.questao];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateQuestao = async function(questoesId, questao) {
	const [text, values] =  mapFields(questoesId, 'questoesId', questao, 'questoes');
    console.log("🚀 ~ file: questaoData.js ~ line 39 ~ exports.updateQuestao=function ~ text", text)
    console.log("🚀 ~ file: questaoData.js ~ line 39 ~ exports.updateQuestao=function ~ values", values)

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteQuestaoByQuestionario = async function (questionarioId) {
	const text = "DELETE FROM questoes WHERE questionarioId = $1;"
	const values = [questionarioId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteQuestao = async function (id) {
	const text = "DELETE FROM questoes WHERE questoesId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
