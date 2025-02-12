const userData = require('../data/userData');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signIn = function (existingUser) {
	const data = { 
		id_usuario: existingUser[0].usuarioId, 
		email: existingUser[0].email,
		roleUsuario: existingUser[0].roleUsuario
	}

	const token = jwt.sign(data, process.env.JWT_KEY, {expiresIn: '1d'})
	const result = {
		message: 'Login realizado com sucesso!',
		usuarioId: existingUser[0].usuarioid,
		roleUsuario: existingUser[0].roleusuario,
		token: token,
	}
	return result
}

exports.login = async function (login) {
	const existingUser = await userData.getUserByEmail(login.email);
	if (existingUser.length == 0) throw new Error('E-mail não encontrado.');
	if (!login.loginSocial && login.senha) {
		const match = await bcrypt.compare(login.senha, existingUser[0].senha)
		if (match) {
			const result = exports.signIn(existingUser)
			return result
		} else {
			throw new Error('Senha inválida!');
		}
	} else {
		const result = exports.signIn(existingUser)
		return result
	}
}