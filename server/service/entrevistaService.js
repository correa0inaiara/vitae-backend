const entrevistaData = require('../data/entrevistaData');
const userData = require('../data/userData');
const processoSeletivoData = require('../data/processoSeletivoData');
const empresaData = require('../data/empresaData');
const candidatoSelecionadoData = require('../data/candidatoSelecionadoData');
const candidaturaData = require('../data/candidaturaData');
const candidatoData = require('../data/candidatoData');
const { exportToCSV, readCSV } = require('../utils/utils');

exports.getEntrevistas = async function () {
	return await entrevistaData.getEntrevistas();
}

exports.getEntrevista = async function (entrevistaId) {
	const entrevistas = await entrevistaData.getEntrevistaById(entrevistaId);

	if (entrevistas && entrevistas.length > 0) {
		await Promise.all(entrevistas.map(async item => {
			const nomeCandidato = await candidatoSelecionadoData.getCandidatoNomeByCandidatoSelecionado(item.candidatoselecionadoid)
			item.nomeCandidato = nomeCandidato[0].nomecompleto
		}))
	}

	return entrevistas
}

exports.getEntrevistaByProcessoSeletivo = async function (processoSeletivoId) {
	const entrevistas = await entrevistaData.getEntrevistaByProcessoSeletivo(processoSeletivoId);

	if (entrevistas && entrevistas.length > 0) {
		await Promise.all(entrevistas.map(async item => {
			const nomeCandidato = await candidatoSelecionadoData.getCandidatoNomeByCandidatoSelecionado(item.candidatoselecionadoid)
			item.nomeCandidato = nomeCandidato[0].nomecompleto
		}))
	}

	return entrevistas
}

exports.getEntrevistaByUsuario = async function (usuarioId) {
	try {
		const usuario = await userData.getUser(usuarioId);
		const roleUsuario = usuario[0].roleUsuario
		let resultado
		if (roleUsuario === 'Empresa') {
			resultado = await entrevistaData.getEntrevistasByEmpresa(usuarioId);
		} else {
			resultado = await entrevistaData.getEntrevistasByCandidato(usuarioId);
		}
		return resultado
	} catch (error) {
		return error
	}
}

exports.getEntrevistasByCandidato = async function (usuarioId) {
	return await entrevistaData.getEntrevistasByCandidato(usuarioId);
}

exports.getEntrevistasByEmpresa = async function (usuarioId) {
	return await entrevistaData.getEntrevistasByEmpresa(usuarioId);
}

exports.saveEntrevista = async function (id, candidatoSelecionadoId, entrevistas) {
	return await entrevistaData.saveEntrevista(id, candidatoSelecionadoId, entrevistas);
}

exports.updateEntrevista = async function (id, entrevista) {
	return await entrevistaData.updateEntrevista(id, entrevista);
}

exports.deleteEntrevista = async function (id) {
	return await entrevistaData.deleteEntrevista(id);
}