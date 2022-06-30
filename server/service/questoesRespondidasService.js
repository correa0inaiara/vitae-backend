const questoesRespondidasData = require('../data/questoesRespondidasData');

exports.getQuestoesRespondidas = async function () {
	return await questoesRespondidasData.getQuestoesRespondidas();
}

exports.getQuestaoRespondida = async function (id) {
	return await questoesRespondidasData.getQuestaoRespondida(id);
}

exports.saveQuestaoRespondida = async function (id, questoes) {
	let questaoResponse = '';
	let questoesResponse = [];
	if (questoes && questoes.length > 0) {
		for (const questao of questoes) {
			questaoResponse = await questoesRespondidasData.saveQuestaoRespondida(id, questao);
			questoesResponse.push(questaoResponse[0]);
		}
	} else {
		questoesResponse = await questoesRespondidasData.saveQuestaoRespondida(id, questoes);
	}
	return questoesResponse;
}

exports.updateQuestaoRespondida = async function (questoesId, body) {
	return await questoesRespondidasData.updateQuestaoRespondida(questoesId, body)
}

exports.deleteQuestaoRespondida = async function (id) {
	return await questoesRespondidasData.deleteQuestaoRespondida(id);
}