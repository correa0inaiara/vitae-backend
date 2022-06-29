const candidatoSelecionadoData = require('../data/candidatoSelecionadoData');

exports.getCandidatoSelecionados = async function () {
	return await candidatoSelecionadoData.getCandidatoSelecionados();
}

exports.getCandidatoSelecionado = async function (processoSeletivoId) {
	return await candidatoSelecionadoData.getCandidatoSelecionado(processoSeletivoId);
}

exports.saveCandidatoSelecionado = async function (processoSeletivoId, candidaturaId) {
	return await candidatoSelecionadoData.saveCandidatoSelecionado(processoSeletivoId, candidaturaId);
}

exports.updateCandidatoSelecionado = async function (id, candidaturaId) {
	return await candidatoSelecionadoData.updateCandidatoSelecionado(id, candidaturaId);
}

exports.deleteCandidatoSelecionado = async function (id) {
	return await candidatoSelecionadoData.deleteCandidatoSelecionado(id);
}