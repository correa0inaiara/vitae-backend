const contatoData = require('../data/contatoData');

exports.getContatos = async function () {
	return await contatoData.getContatos();
}

exports.getContato = async function (id) {
	return await contatoData.getContato(id);
}

exports.saveContato = async function (id, contatos) {
	let contatoResponse = '';
	let contatosResponse = [];
	for (const contato of contatos) {
		contatoResponse = await contatoData.saveContato(id, contato);
		contatosResponse.push(contatoResponse[0]);
	}
	return contatosResponse;
}

exports.updateContato = async function (id, contato) {
	return await contatoData.updateContato(id, contato);
}

exports.deleteContato = async function (id) {
	return await contatoData.deleteContato(id);
}