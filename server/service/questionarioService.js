const questionarioData = require('../data/questionarioData');
const questaoData = require('../data/questaoData');
const questaoService = require('../service/questaoService');

exports.getQuestionarios = async function () {
	return await questionarioData.getQuestionarios();
}

exports.getQuestionarioById = async function (questionarioId) {
	return await questionarioData.getQuestionarioById(questionarioId);
}

exports.getQuestionario = async function (empresaId) {
	const questionarioResult = await questionarioData.getQuestionario(empresaId);
	let questionarioCompleto = []
	if (questionarioResult) {
		if (questionarioResult.length > 0) {
			const result = await Promise.all(questionarioResult.map(async item => {
				const questionsResult = await questaoData.getQuestao(item.questionarioid);
				
				if (questionsResult) {
					questionarioCompleto.push(
						{
							questionario: item,
							questoes: questionsResult
						}
					)
				} else {
					throw new Error('Erro no serviço getQuestao')
				}
				return questionarioCompleto
			}))
			return questionarioCompleto
		} else {
			return questionarioResult
		}
	} else {
		throw new Error('Erro no serviço getQuestionario')
	}
}

exports.saveQuestionario = async function (id, questionarios) {
	return await questionarioData.saveQuestionario(id, questionarios);
}

exports.updateQuestionario = async function (questionarioId, data) {
	const questionarioObj = data.questionario
	const questoesArr = data.questoes.questoes
	const questoesAdicionadas = data.questoes.questoesAdicionadas
	const questoesExcluidas = data.questoes.questoesExcluidas

	const questionario = await questionarioData.updateQuestionario(questionarioId, questionarioObj);

	let updateQuestoes = []
	if (questoesArr && questoesArr.length > 0) {
		questoesArr.map(async item => {
			if (item.questoesId) {
				let obj = {
					questao: item.questao
				}
				const questoes = await questaoService.updateQuestao(item.questoesId, obj)
			}
		})
	}
	
	let addQuestoes = []
	if (questoesAdicionadas && questoesAdicionadas.length > 0) {
		questoesAdicionadas.map(async item => {
			let obj = {
				questao: item.questao
			}
			const result = await questaoService.saveQuestao(questionarioId, obj);
		})
	}

	let delQuestoes = []
	if (questoesExcluidas && questoesExcluidas.length > 0) {
		questoesExcluidas.map(async item => {
			const result = await questaoService.deleteQuestao(item.questoesId);
		})
	}

	return questionario
}

exports.deleteQuestionario = async function (questionarioId) {
	const questao = await Promise.all([questaoData.deleteQuestaoByQuestionario(questionarioId)])

	let questionario = []
	if (questao) {
		questionario = await questionarioData.deleteQuestionario(questionarioId);
	}

	return questionario
}