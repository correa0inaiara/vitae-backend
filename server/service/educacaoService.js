const educacaoData = require('../data/educacaoData');

exports.getEducacao = async function () {
	return await educacaoData.getEducacao();
}

exports.getEducacaoById = async function (id) {
	return await educacaoData.getEducacaoById(id);
}

exports.saveEducacao = async function (id, educacaoArr) {
	let educacaoResponse = '';
	let educacaoResponses = [];
	if (educacaoArr && educacaoArr.length > 1) {
		for (const educacao of educacaoArr) {
			educacaoResponse = await educacaoData.saveEducacao(id, educacao);
			educacaoResponses.push(educacaoResponse[0]);
		}
	} else if (educacaoArr.length > 0) {
		const educacao = Array.isArray(educacaoArr) ? educacaoArr[0] : educacaoArr
		educacaoResponses = await educacaoData.saveEducacao(id, educacao);
	}
	return educacaoResponses;
}

exports.updateEducacao = async function (id, educacao) {
	return await educacaoData.updateEducacao(id, educacao);
}

exports.deleteEducacao = async function (id) {
	return await educacaoData.deleteEducacao(id);
}