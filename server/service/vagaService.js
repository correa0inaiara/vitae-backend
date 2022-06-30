const vagaData = require('../data/vagaData');
const beneficioOferecidoData = require('../data/beneficioOferecidoData');
const tiposContratacaoEBeneficiosService = require('../service/tiposContratacaoEBeneficiosService')
const questionarioService = require('../service/questionarioService');
const { getEmpresa } = require('./empresaService');
const { getEmpresaById } = require('../data/empresaData');

exports.getVagas = async function () {
	const vagaResult = await vagaData.getVagas();
	let vagaCompleto = []
	if (vagaResult) {
		if (vagaResult.length > 0) {
			const result = await Promise.all(vagaResult.map(async item => {
				const empresa = await getEmpresaById(item.empresaid)

				const beneficiosOferecidosResult = await beneficioOferecidoData.getBeneficioOferecido(item.vagaid);

				const tiposContratacaoEBeneficios = await tiposContratacaoEBeneficiosService.getTiposContratacaoEBeneficiosService(item.vagaid);
				
				const tiposContratacao = tiposContratacaoEBeneficios.tiposContratacao

				const contratacao = tiposContratacao.find(item2 => item.tipocontratacaoid === item2.tipocontratacaoid)

				item.tipoContratacao = contratacao.contratacao

				if (item.questionarioid) {
					const questionarios = await questionarioService.getQuestionario(item.empresaid);

					if (questionarios && questionarios.length > 0) {
						let questionariosArr = []
						questionarios.map(item => {
							const questionarioObj = item.questionario
							questionariosArr.push({
								nome: questionarioObj.nome,
								questionarioId: questionarioObj.questionarioid
							})
						})
						
						const questionario = questionariosArr.find(item3 => item.questionarioid === item3.questionarioId)
		
						item.questionario = questionario.nome
					}
				}

				if (beneficiosOferecidosResult) {
					vagaCompleto.push(
						{
							empresa: empresa[0],
							vaga: item,
							beneficiosOferecidos: beneficiosOferecidosResult
						}
					)
				} else {
					throw new Error('Erro no serviço getBeneficioOferecido')
				}
				return vagaCompleto
			}))
			return vagaCompleto
		} else {
			return vagaResult
		}
	} else {
		throw new Error('Erro no serviço getVaga')
	}
}

exports.getVaga = async function (empresaId) {
	const vagaResult = await vagaData.getVaga(empresaId);
	let vagaCompleto = []
	if (vagaResult) {
		if (vagaResult.length > 0) {
			const result = await Promise.all(vagaResult.map(async item => {
				const beneficiosOferecidosResult = await beneficioOferecidoData.getBeneficioOferecido(item.vagaid);

				const tiposContratacaoEBeneficios = await tiposContratacaoEBeneficiosService.getTiposContratacaoEBeneficiosService(item.vagaid);
				
				const tiposContratacao = tiposContratacaoEBeneficios.tiposContratacao

				const contratacao = tiposContratacao.find(item2 => item.tipocontratacaoid === item2.tipocontratacaoid)

				item.tipoContratacao = contratacao.contratacao

				if (item.questionarioid) {
					const questionarios = await questionarioService.getQuestionario(empresaId);

					if (questionarios && questionarios.length > 0) {
						let questionariosArr = []
						questionarios.map(item => {
							const questionarioObj = item.questionario
							questionariosArr.push({
								nome: questionarioObj.nome,
								questionarioId: questionarioObj.questionarioid
							})
						})
						
						const questionario = questionariosArr.find(item3 => item.questionarioid === item3.questionarioId)

						item.questionario = questionario.nome
					}
				}

				if (beneficiosOferecidosResult) {
					vagaCompleto.push(
						{
							vaga: item,
							beneficiosOferecidos: beneficiosOferecidosResult
						}
					)
				} else {
					throw new Error('Erro no serviço getBeneficioOferecido')
				}
				return vagaCompleto
			}))
			return vagaCompleto
		} else {
			return vagaResult
		}
	} else {
		throw new Error('Erro no serviço getVaga')
	}
}

exports.saveVaga = async function (empresaId, questionarioId, tipoContratacaoId, vaga) {
	return await vagaData.saveVaga(empresaId, questionarioId, tipoContratacaoId, vaga);
}

exports.updateVaga = async function (id, vaga) {
	return await vagaData.updateVaga(id, vaga);
}

exports.deleteVaga = async function (vagaId) {
	const vaga = await vagaData.deleteVaga(vagaId);
	const newResult = await beneficioOferecidoData.getBeneficioOferecido(vagaId)
	
	if (newResult && newResult.length > 0) {
		newResult.map(async item => {
			const excludeResult = await beneficioOferecidoData.deleteBeneficioOferecido(item.beneficiosoferecidosid)
		})
	}

	return []
}