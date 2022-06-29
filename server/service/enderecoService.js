const enderecoData = require('../data/enderecoData');

exports.getEnderecos = async function () {
	return await enderecoData.getEnderecos();
}

exports.getEndereco = async function (id) {
	return await enderecoData.getEndereco(id);
}

exports.saveEndereco = async function (id, enderecos) {
	return await enderecoData.saveEndereco(id, enderecos);
}

exports.updateEndereco = async function (id, endereco) {
	return await enderecoData.updateEndereco(id, endereco);
}

exports.deleteEndereco = async function (id) {
	return await enderecoData.deleteEndereco(id);
}