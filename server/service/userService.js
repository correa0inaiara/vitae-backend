const userData = require('../data/userData');
const contatoService = require('../service/contatoService');
const enderecoService = require('../service/enderecoService');
const redeSocialService = require('../service/redeSocialService');
const candidatoService = require('../service/candidatoService');
const empresaService = require('../service/empresaService');

exports.getUsers = async function () {
	return await userData.getUsers();
}

exports.getUser = async function (userId) {
	const user = await userData.getUser(userId);
	if (!user) throw new Error('Usuário não encontrado');
	return user;
}

exports.saveUser = async function (user) {

	const usuario = user.usuario

	const existingEmail = await userData.getUserByEmail(usuario?.email);
	if (existingEmail.length > 0) throw new Error('Esse e-mail já foi cadastrado, use outro.');
	
	const empresa = user.empresa
	const candidato = user.candidato
	const contatos = user.contatos
	const endereco = user.endereco
	const redesSociais = user.redesSociais

	let usuarioResult = ''
	let contatosResult = ''
	let enderecoResult = ''
	let redesSociaisResult = ''
	let candidatoResult = ''
	let empresaResult = ''
	let usuarioId = ''

	usuarioResult = await userData.saveUser(usuario)

	if (usuarioResult && usuarioResult.length > 0) {
		usuarioId = usuarioResult[0].usuarioid
		contatosResult = await contatoService.saveContato(usuarioId, contatos)
		
		if (contatosResult && contatosResult.length > 0) {
			usuario.contatos = contatosResult
			enderecoResult = await enderecoService.saveEndereco(usuarioId, endereco)

			if (enderecoResult && enderecoResult.length > 0) {
				usuario.endereco = enderecoResult
				
				if (redesSociais && redesSociais.length > 0) {
					redesSociaisResult = await redeSocialService.saveRedeSocial(usuarioId, redesSociais)
				
					if (redesSociaisResult && redesSociaisResult.length > 0) {
						usuario.redesSociais = redesSociaisResult
					}
				}

				if (usuario.tipoUsuario === 'Candidato') {
					candidatoResult = await candidatoService.saveCandidato(usuarioId, candidato)

					if (candidatoResult && candidatoResult.length > 0) {
						usuario.candidato = candidatoResult
					}
				} else {
					empresaResult = await empresaService.saveEmpresa(usuarioId, empresa)

					if (empresaResult && empresaResult.length > 0) {
						usuario.empresa = empresaResult
					} 
				}
			} 
		}

	}
	
	if (
		!usuarioResult && usuarioResult.length === 0 ||
		!contatosResult && contatosResult.length === 0 ||
		!enderecoResult && enderecoResult.length === 0
	) {
		await userData.deleteUser(usuarioId)
	} else {
		if (
			(usuario.tipoUsuario === 'Candidato' && !candidatoResult && candidatoResult.length === 0) ||
			(usuario.tipoUsuario === 'Empresa' && !empresaResult && empresaResult.length === 0)
		) {
			await userData.deleteUser(usuarioId)
		}
	}
	
	return usuario
}

exports.updateUser = async function (id, user) {
	await exports.getUser(id);
	return await userData.updateUser(id, user);
}

exports.deleteUser = async function (id) {
	await exports.getUser(id);
	return await userData.deleteUser(id);
}