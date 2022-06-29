const database = require('../infra/database')
const { mapFields } = require('../utils/utils');

exports.getRedesSociais = async function () {
	const text = "SELECT * FROM redesSociais;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getRedeSocial = async function (userId) {
	const text = "SELECT * FROM redesSociais WHERE usuarioID = $1;"
	const values = [userId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveRedeSocial = async function (userID, redesSociais) {
	const text = "INSERT INTO redesSociais (usuarioid, nomeDaRedeSocial, perfilUsuario) VALUES ($1, $2, $3) returning *"
	const values = [userID, redesSociais.nomeDaRedeSocial, redesSociais.perfilUsuario];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateRedeSocial = async function(userId, redesSociais) {

	const [text, values] =  mapFields(userId, 'redeSocialId', redesSociais, 'redesSociais');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteRedeSocial = async function (id) {
	const text = "DELETE FROM redesSociais WHERE redeSocialId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
