const database = require('../infra/database')
const { mapFields } = require('../utils/utils');

exports.getEnderecos = async function () {
	const text = "SELECT * FROM enderecos;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getEndereco = async function (userId) {
	const text = "SELECT * FROM enderecos WHERE usuarioID = $1;"
	const values = [userId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveEndereco = async function (userID, endereco) {
	const text = "INSERT INTO enderecos (usuarioid, logradouro, cep, complemento, numero, bairro, cidade, uf, pais) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *"
	const values = [userID, endereco.logradouro, endereco.cep, endereco.complemento, endereco.numero, endereco.bairro, endereco.cidade, endereco.uf, endereco.pais];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateEndereco = async function(userId, endereco) {

	const [text, values] =  mapFields(userId, 'enderecoId', endereco, 'enderecos');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteEndereco = async function (id) {
	const text = "DELETE FROM enderecos WHERE enderecoId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
