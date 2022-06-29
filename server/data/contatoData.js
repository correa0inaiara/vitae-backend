const database = require('./../infra/database')
const { mapFields } = require('../utils/utils');

exports.getContatos = async function () {
	const text = "SELECT * FROM contatos;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getContato = async function (userId) {
	const text = "SELECT * FROM contatos WHERE usuarioID = $1;"
	const values = [userId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveContato = async function (userID, contato) {
	const text = "INSERT INTO contatos (usuarioid, tipocontato, contato) VALUES ($1, $2, $3) returning *"
	const values = [userID, contato.tipoContato, contato.contato];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateContato = async function(userId, contato) {

	const [text, values] =  mapFields(userId, 'contatoId', contato, 'contatos');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteContato = async function (id) {
	const text = "DELETE FROM contatos WHERE contatoId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
