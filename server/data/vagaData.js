const database = require('../infra/database')
const { mapFields, handleDates } = require('../utils/utils');

exports.getVagas = async function () {
	const text = "SELECT * FROM vagas;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getVagaById = async function (vagaId) {
	const text = "SELECT * FROM vagas WHERE vagaId = $1;"
	const values = [vagaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getVaga = async function (empresaId) {
	const text = "SELECT * FROM vagas WHERE empresaId = $1;"
	const values = [empresaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveVaga = async function (empresaId, questionarioId, tipoContratacaoId, vaga) {
	
	// vaga.prazo = handleDates(vaga.prazo);

	const text = "INSERT INTO vagas (empresaId, questionarioId, tipoContratacaoId, nome, descricao, localizacao, salario, prazo, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *"
	const values = [empresaId, questionarioId, tipoContratacaoId, vaga.nome, vaga.descricao, vaga.localizacao, vaga.salario, vaga.prazo, vaga.status];
	
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateVaga = async function(id, vaga) {

	// if (vaga.prazo) {
	// 	vaga.prazo = handleDates(vaga.prazo);
	// }

	const [text, values] =  mapFields(id, 'vagaId', vaga, 'vagas');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteVaga = async function (id) {
	const text = "DELETE FROM vagas WHERE vagaId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
