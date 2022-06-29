const candidatoData = require('../data/candidatoData');

exports.getCandidatos = async function () {
	return await candidatoData.getCandidatos();
}

exports.getCandidato = async function (id) {
	return await candidatoData.getCandidato(id);
}

exports.saveCandidato = async function (id, candidatos) {
	const user = await candidatoData.getCandidato(id);
	if (user.length == 1) throw new Error('Não pode existir múltiplos candidatos para um mesmo usuário.');
	
	const existingCPF = await candidatoData.getCandidatoByCPF(candidatos.cpf);
	if (existingCPF.length > 0) throw new Error('Esse CPF já foi cadastrado.');
	
	return await candidatoData.saveCandidato(id, candidatos);
}

exports.updateCandidato = async function (id, candidato) {
	return await candidatoData.updateCandidato(id, candidato);
}

exports.deleteCandidato = async function (id) {
	return await candidatoData.deleteCandidato(id);
}