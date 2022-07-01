const agendamentoData = require('../data/agendamentoData');
const userData = require('../data/userData');
const processoSeletivoData = require('../data/processoSeletivoData');
const empresaData = require('../data/empresaData');
const candidatoSelecionadoData = require('../data/candidatoSelecionadoData');
const candidaturaData = require('../data/candidaturaData');
const candidatoData = require('../data/candidatoData');
const { exportToCSV, readCSV } = require('../utils/utils');

exports.getAgendamentos = async function () {
	return await agendamentoData.getAgendamentos();
}

exports.getAgendamento = async function (processoSeletivoId) {
	const agendamentos = await agendamentoData.getAgendamento(processoSeletivoId);

	if (agendamentos && agendamentos.length > 0) {
		await Promise.all(agendamentos.map(async item => {
			const nomeCandidato = await candidatoSelecionadoData.getCandidatoNomeByCandidatoSelecionado(item.candidatoselecionadoid)
			item.nomeCandidato = nomeCandidato[0].nomecompleto
		}))
	}

	return agendamentos
}

exports.getAgendamentoByUsuario = async function (usuarioId) {
	try {
		const usuario = await userData.getUser(usuarioId);
		const tipoUsuario = usuario[0].tipousuario
		let resultado
		if (tipoUsuario === 'Empresa') {
			resultado = await agendamentoData.getAgendamentosByEmpresa(usuarioId);
		} else {
			resultado = await agendamentoData.getAgendamentosByCandidato(usuarioId);
		}
		return resultado
	} catch (error) {
		return error
	}
}

exports.getAgendamentosByCandidato = async function (usuarioId) {
	return await agendamentoData.getAgendamentosByCandidato(usuarioId);
}

exports.getAgendamentosByEmpresa = async function (usuarioId) {
	return await agendamentoData.getAgendamentosByEmpresa(usuarioId);
}

exports.saveAgendamento = async function (id, candidatoSelecionadoId, agendamentos) {
	return await agendamentoData.saveAgendamento(id, candidatoSelecionadoId, agendamentos);
}

exports.updateAgendamento = async function (id, agendamento) {
	return await agendamentoData.updateAgendamento(id, agendamento);
}

exports.deleteAgendamento = async function (id) {
	return await agendamentoData.deleteAgendamento(id);
}