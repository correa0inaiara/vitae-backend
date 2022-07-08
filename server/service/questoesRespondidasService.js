const { getQuestaoById } = require('../data/questaoData');
const questoesRespondidasData = require('../data/questoesRespondidasData');
const { getCandidato } = require('./candidatoService');

exports.getQuestoesRespondidas = async function () {
	return await questoesRespondidasData.getQuestoesRespondidas();
}

exports.getQuestaoRespondida = async function (id) {
	return await questoesRespondidasData.getQuestaoRespondida(id);
}

exports.getQuestaoRespondidaByQuestionario = async function (id, usuarioId) {
	const candidato = await getCandidato(usuarioId)
	if (candidato && candidato.length > 0) {
		const candidatoId = candidato[0].candidatoid
		const questoesRespondidas = await questoesRespondidasData.getQuestaoRespondidaByQuestionario(id, candidatoId);
		
		if (questoesRespondidas && questoesRespondidas.length > 0) {
			await Promise.all(questoesRespondidas.map(async item => {
				const questao = await getQuestaoById(item.questoesid)
				item.questao = questao[0].questao
			}))
		}
		return questoesRespondidas
	}
}

exports.saveQuestaoRespondida = async function (id, questionarioId, usuarioId, questoes) {
	const candidato = await getCandidato(usuarioId)
	let questaoResponse = '';
	let questoesResponse = [];
	if (candidato && candidato.length === 1) {
		const candidatoId = candidato[0].candidatoid
		if (questoes && questoes.length > 0) {
			for (const questao of questoes) {
				questaoResponse = await questoesRespondidasData.saveQuestaoRespondida(id, questionarioId, candidatoId, questao);
				questoesResponse.push(questaoResponse[0]);
			}
		} else {
			questoesResponse = await questoesRespondidasData.saveQuestaoRespondida(id, questionarioId, candidatoId, questoes);
		}
	}
	return questoesResponse;
}

exports.updateQuestaoRespondida = async function (questoesId, body) {
	return await questoesRespondidasData.updateQuestaoRespondida(questoesId, body)
}

exports.deleteQuestaoRespondida = async function (id) {
	return await questoesRespondidasData.deleteQuestaoRespondida(id);
}