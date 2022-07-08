const { getQuestaoById } = require('../data/questaoData');
const questoesRespondidasData = require('../data/questoesRespondidasData');

exports.getQuestoesRespondidas = async function () {
	return await questoesRespondidasData.getQuestoesRespondidas();
}

exports.getQuestaoRespondida = async function (id) {
	return await questoesRespondidasData.getQuestaoRespondida(id);
}

exports.getQuestaoRespondidaByQuestionario = async function (id) {
	const questoesRespondidas = await questoesRespondidasData.getQuestaoRespondidaByQuestionario(id);
	
	if (questoesRespondidas && questoesRespondidas.length > 0) {
		await Promise.all(questoesRespondidas.map(async item => {
			const questao = await getQuestaoById(item.questoesid)
			item.questao = questao[0].questao
		}))
	}
	return questoesRespondidas
}

exports.saveQuestaoRespondida = async function (id, questionarioId, questoes) {
	let questaoResponse = '';
	let questoesResponse = [];
	if (questoes && questoes.length > 0) {
		for (const questao of questoes) {
			questaoResponse = await questoesRespondidasData.saveQuestaoRespondida(id, questionarioId, questao);
			questoesResponse.push(questaoResponse[0]);
		}
	} else {
		questoesResponse = await questoesRespondidasData.saveQuestaoRespondida(id, questionarioId, questoes);
	}
	return questoesResponse;
}

exports.updateQuestaoRespondida = async function (questoesId, body) {
	return await questoesRespondidasData.updateQuestaoRespondida(questoesId, body)
}

exports.deleteQuestaoRespondida = async function (id) {
	return await questoesRespondidasData.deleteQuestaoRespondida(id);
}