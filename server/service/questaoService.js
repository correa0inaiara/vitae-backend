const questaoData = require('../data/questaoData');

exports.getQuestoes = async function () {
	return await questaoData.getQuestoes();
}

exports.getQuestao = async function (id) {
	return await questaoData.getQuestao(id);
}

exports.saveQuestao = async function (id, questoes) {
	let questaoResponse = '';
	let questoesResponse = [];
	if (questoes && questoes.length > 0) {
		for (const questao of questoes) {
			questaoResponse = await questaoData.saveQuestao(id, questao);
			questoesResponse.push(questaoResponse[0]);
		}
	} else {
		questoesResponse = await questaoData.saveQuestao(id, questoes);
	}
	return questoesResponse;
}

exports.updateQuestao = async function (questoesId, body) {
	return await questaoData.updateQuestao(questoesId, body)
}

exports.deleteQuestao = async function (id) {
	return await questaoData.deleteQuestao(id);
}