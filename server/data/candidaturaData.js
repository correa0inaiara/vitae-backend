const database = require('../infra/database')
const { mapFields } = require('../utils/utils');

exports.getCandidaturas = async function () {
	const text = "SELECT * FROM candidaturas;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCandidaturasByVaga = async function (vagaId) {
	const text = "SELECT * FROM candidaturas WHERE vagaId = $1"
	const values = [vagaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCandidaturaById = async function (candidaturaId) {
	const text = "SELECT * FROM candidaturas WHERE candidaturaId = $1;"
	const values = [candidaturaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCandidaturaByCandidato = async function (candidatoId) {
	const text = "SELECT * FROM candidaturas WHERE candidatoId = $1;"
	const values = [candidatoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCandidatoByCandidatura = async function (candidaturaId) {
	const text = `
		select c2.nomecompleto, v.nome
		from candidaturas c  
		full join candidatos c2 
		on c.candidatoid = c2.candidatoid 
		full join vagas v 
		on c.vagaid = v.vagaid 
		where candidaturaid = $1
	`
	const values = [candidaturaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveCandidatura = async function (candidatoId, curriculoId, vagaId) {
	const text = "INSERT INTO candidaturas (candidatoId, curriculoId, vagaId) VALUES ($1, $2, $3) returning *"
	const values = [candidatoId, curriculoId, vagaId];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateCandidatura = async function(id, vagaId) {
	const [text, values] =  mapFields(id, 'candidaturaId', vagaId, 'candidaturas');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteCandidatura = async function (id) {
	const text = "DELETE FROM candidaturas WHERE candidaturaId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
