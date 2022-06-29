const userData = require('../data/userData');
const contatoData = require('../data/contatoData');
const enderecoData = require('../data/enderecoData');
const redesocialData = require('../data/redesocialData');

exports.getUsers = async function () {
	return await userData.getUsers();
}

exports.getUser = async function (userId) {
	const user = await userData.getUser(userId);
	if (!user) throw new Error('Usuário não encontrado');
	return user;
}

exports.saveUser = async function (user) {
	const existingEmail = await userData.getUserByEmail(user?.email);
	if (existingEmail.length > 0) throw new Error('Esse e-mail já foi cadastrado, use outro.');
 
	/*
	const usuariosData = user.usuarios
	const contatosData = user.contatos
	const enderecosData = user.enderecos
	const redessociaisData = user.redessociais

	const usuarios = await userData.saveUser(user)
	if (usuarios && usuarios.length > 0) {
		const usuariosId = usuarios[0].usuariosid
		const contatos = await contatoData.saveContato(usuariosId, contatosData)
		
		let saved = true
		if (contatos && contatos.length > 0) {
			const enderecos = await enderecoData.saveEndereco(usuariosId, enderecosData)

			if (enderecos && enderecos.length > 0) {
				const redessociais = await redesocialData.saveRedeSocial(usuariosId, redessociaisData)
			} else {
				saved = false
			}
		} else {
			saved = false
		}

		if (!saved) {
			await userData.deleteUser(usuariosId)
		}
	}
	*/
	
	return await userData.saveUser(user)
}

exports.updateUser = async function (id, user) {
	await exports.getUser(id);
	return await userData.updateUser(id, user);
}

exports.deleteUser = async function (id) {
	await exports.getUser(id);
	return await userData.deleteUser(id);
}