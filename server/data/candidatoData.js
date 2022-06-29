const database = require('../infra/database')
const { mapFields, handleDates } = require('../utils/utils');

exports.getCandidatos = async function () {
	const text = "SELECT * FROM candidatos;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCandidatoById = async function (candidatoId) {
	const text = "SELECT * FROM candidatos WHERE candidatoId = $1;"
	const values = [candidatoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCandidato = async function (userId) {
	const text = "SELECT * FROM candidatos WHERE usuarioID = $1;"
	const values = [userId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCandidatoByCPF = async function (userCPF) {
	const text = "SELECT * FROM candidatos WHERE cpf = $1;"
	const values = [userCPF]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveCandidato = async function (userID, candidato) {
	// candidato.dataNascimento = handleDates(candidato.dataNascimento);

	const text = "INSERT INTO candidatos (usuarioid, nomeCompleto, cpf, profissao, carteiraHabilitacao, dataNascimento, website) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *"
	const values = [userID, candidato.nomeCompleto, candidato.cpf, candidato.profissao, candidato.carteiraHabilitacao, candidato.dataNascimento, candidato.website];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateCandidato = async function(userId, candidato) {
	if (candidato.dataNascimento) {
		candidato.dataNascimento = handleDates(candidato.dataNascimento);
	}
	
	const [text, values] =  mapFields(userId, 'candidatoId', candidato, 'candidatos');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteCandidato = async function (id) {
	const text = "DELETE FROM candidatos WHERE candidatoId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
