const candidaturaData = require('../data/candidaturaData');
const candidatoData = require('../data/candidatoData');
const curriculoData = require('../data/curriculoData');
const curriculoService = require('../service/curriculoService');
const vagaData = require('../data/vagaData');

exports.getCandidaturas = async function () {
	return await candidaturaData.getCandidaturas();
}

exports.getCandidaturasByVaga = async function (vagaId) {
	const candidaturas = await candidaturaData.getCandidaturasByVaga(vagaId);
	
	if (candidaturas && candidaturas.length > 0) {
		await Promise.all(candidaturas.map(async item => {
			const candidato = await candidaturaData.getCandidatoByCandidatura(item.candidaturaid)
			item.candidato = candidato[0]
		}))
	}

	return candidaturas
}

exports.getCandidaturaById = async function (candidaturaId) {
	const candidatura = await candidaturaData.getCandidaturaById(candidaturaId);

	const candidato = await candidatoData.getCandidatoById(candidatura[0].candidatoid)
	candidatura[0].candidato = candidato[0]

	const curriculo = await curriculoService.getCurriculoById(candidatura[0].curriculoid)
	candidatura[0].curriculo = curriculo[0]

	const vaga = await vagaData.getVagaById(candidatura[0].vagaid)
	candidatura[0].vaga = vaga[0]

	return candidatura[0]
}

exports.getCandidaturaByCandidato = async function (candidatoId) {
	let candidaturas = await candidaturaData.getCandidaturaByCandidato(candidatoId);

	if (candidaturas && candidaturas.length > 0) {
		await Promise.all(candidaturas.map(async item => {
			const curriculo = await curriculoData.getCurriculoById(item.curriculoid)
			item.curriculo = curriculo[0]
		}))
	}
	
	return candidaturas 
}

exports.saveCandidatura = async function (candidatoId, curriculoId, vagaId) {
	return await candidaturaData.saveCandidatura(candidatoId, curriculoId, vagaId);
}

exports.updateCandidatura = async function (id, vagaId) {
	return await candidaturaData.updateCandidatura(id, vagaId);
}

exports.deleteCandidatura = async function (id) {
	return await candidaturaData.deleteCandidatura(id);
}