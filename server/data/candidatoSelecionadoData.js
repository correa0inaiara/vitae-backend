const database = require('../infra/database')
const { mapFields } = require('../utils/utils');

exports.getCandidatoSelecionados = async function () {
	const text = "SELECT * FROM candidatosSelecionados;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCandidatoNomeByCandidatoSelecionado = async function (candidatoSelecionadoId) {
	const text = `
		SELECT c3.nomecompleto 
		FROM candidatosSelecionados c
		full join candidaturas c2
		on c2.candidaturaid = c.candidaturaid 
		full join candidatos c3 
		on c3.candidatoid = c2.candidatoid 
		WHERE candidatoSelecionadoId = $1;	
	`
	const values = [candidatoSelecionadoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCandidatoSelecionado = async function (processoSeletivoId) {
	const text = `
		SELECT *
		FROM candidatosSelecionados c
		full join candidaturas c2
		on c2.candidaturaid = c.candidaturaid 
		full join candidatos c3 
		on c3.candidatoid = c2.candidatoid 
		WHERE processoSeletivoId = $1;
	`
	const values = [processoSeletivoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveCandidatoSelecionado = async function (processoSeletivoId, candidaturaId) {
	const text = "INSERT INTO candidatosSelecionados (processoSeletivoId, candidaturaId) VALUES ($1, $2) returning *"
	const values = [processoSeletivoId, candidaturaId];
	
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateCandidatoSelecionado = async function(id, candidaturaId) {
	const [text, values] =  mapFields(id, 'candidatoSelecionadoId', candidaturaId, 'candidatosSelecionados');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteCandidatoSelecionado = async function (id) {
	const text = "DELETE FROM candidatosSelecionados WHERE candidatoSelecionadoId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
