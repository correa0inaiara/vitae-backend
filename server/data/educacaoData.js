const database = require('../infra/database')
const { mapFields, handleDates } = require('../utils/utils');

exports.getEducacao = async function () {
	const text = "SELECT * FROM educacao;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getEducacaoById = async function (curriculoId) {
	const text = "SELECT * FROM educacao WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveEducacao = async function (curriculoId, educacao) {
	
	const text = "INSERT INTO educacao (curriculoId, educacao, localizacao, periodoInicial, periodoFinal) VALUES ($1, $2, $3, $4, $5) returning *"
	const values = [curriculoId, educacao.educacao, educacao.localizacao, educacao.periodoinicial, educacao.periodofinal];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateEducacao = async function(educacaoID, educacao) {

	const [text, values] =  mapFields(educacaoID, 'educacaoId', educacao, 'educacao');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteEducacaoByCurriculo = async function (curriculoId) {
	const text = "DELETE FROM educacao WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteEducacao = async function (id) {
	const text = "DELETE FROM educacao WHERE educacaoId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
