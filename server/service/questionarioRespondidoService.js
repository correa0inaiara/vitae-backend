const questionarioRespondidoData = require('../data/questionarioRespondidoData');

exports.getQuestionariosRespondidos = async function () {
	return await questionarioRespondidoData.getQuestionariosRespondidos();
}

exports.getQuestionarioRespondido = async function (id) {
	return await questionarioRespondidoData.getQuestionarioRespondido(id);
}

exports.saveQuestionarioRespondido = async function (questionarioId, candidatoId) {
	return await questionarioRespondidoData.saveQuestionarioRespondido(questionarioId, candidatoId);
}

exports.updateQuestionarioRespondido = async function (id, questionarioId, candidatoId) {
	return await questionarioRespondidoData.updateQuestionarioRespondido(id, questionarioId, candidatoId);
}

exports.deleteQuestionarioRespondido = async function (id) {
	return await questionarioRespondidoData.deleteQuestionarioRespondido(id);
}