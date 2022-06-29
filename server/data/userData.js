const { mapFields, generateHashPassword } = require('../utils/utils');
const database = require('./../infra/database')
const bcrypt = require('bcrypt')

exports.getUsers = async function () {
	const text = "SELECT * FROM usuarios;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getUser = async function (userId) {
	const text = "SELECT * FROM usuarios WHERE usuarioID = $1;"
	const values = [userId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getUserByEmail = async function (userEmail) {
	const text = "SELECT * FROM usuarios WHERE email = $1;"
	const values = [userEmail]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveUser = async function(user) {
	try {
		user.senha = await generateHashPassword(user.senha);
		const text = "INSERT INTO usuarios (email, senha, tipoUsuario, loginSocial) VALUES ($1, $2, $3, $4) returning *"
		const values = [user.email, user.senha, user.tipoUsuario, user.loginSocial]
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateUser = async function(id, user) {
	if (user.senha) {
		user.senha = await generateHashPassword(user.senha);
	}

	const [text, values] =  mapFields(id, 'usuarioId', user, 'usuarios');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteUser = async function (userId) {
	const text = "DELETE FROM usuarios WHERE usuarioID = $1;"
	const values = [userId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}