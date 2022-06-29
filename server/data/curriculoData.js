const database = require('../infra/database')
const { mapFields, formatDateToDB } = require('../utils/utils');

exports.getCurriculos = async function () {
	const text = "SELECT * FROM curriculos;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCurriculoById = async function (curriculoId) {
	const text = "SELECT * FROM curriculos WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getCurriculo = async function (userId) {
	const text = "SELECT * FROM curriculos WHERE usuarioID = $1;"
	const values = [userId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveCurriculo = async function (userID, curriculo) {
	const text = "INSERT INTO curriculos (usuarioid, nome, descricao) VALUES ($1, $2, $3) returning *"
	const values = [userID, curriculo.nome, curriculo.descricao];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateCurriculo = async function(userId, curriculo) {
	const [text, values] =  mapFields(userId, 'curriculoId', curriculo, 'curriculos');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteCurriculo = async function (id) {
	const text = "DELETE FROM curriculos WHERE curriculoId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
