const vagaData = require('../data/vagaData');
const beneficioOferecidoData = require('../data/beneficioOferecidoData');
const tiposContratacaoEBeneficiosService = require('../service/tiposContratacaoEBeneficiosService')
const questionarioService = require('../service/questionarioService');
const candidaturaService = require('../service/candidaturaService');
const { getEmpresaById } = require('../data/empresaData');
const { getCandidato } = require('./candidatoService');
const { getQuestionarioById } = require('../service/questionarioService');

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
							const questionarioObj = item
							questionariosArr.push({
								nome: questionarioObj.questionario.nome,
								questionarioId: questionarioObj.questionario.questionarioid,
								questoes: questionarioObj.questoes
							})
						})
						
						const questionario = questionariosArr.find(item3 => item.questionarioid === item3.questionarioId)
		
						item.questionario = questionario
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
					throw new Error('Erro no servi??o getBeneficioOferecido')
				}
				return vagaCompleto
			}))
			return vagaCompleto
		} else {
			return vagaResult
		}
	} else {
		throw new Error('Erro no servi??o getVaga')
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
								questionarioId: questionarioObj.questionarioid,
								questoes: questionarioObj.questoes
							})
						})
						
						const questionario = questionariosArr.find(item3 => item.questionarioid === item3.questionarioId)

						item.questionario = questionario
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
					throw new Error('Erro no servi??o getBeneficioOferecido')
				}
				return vagaCompleto
			}))
			return vagaCompleto
		} else {
			return vagaResult
		}
	} else {
		throw new Error('Erro no servi??o getVaga')
	}
}

exports.getVagaCandidaturaById = async function (vagaId, usuarioId) {
	const vagaResult = await vagaData.getVagaById(vagaId);
	if (vagaResult && vagaResult.length === 1) {
		const result = await Promise.all(vagaResult.map(async item => {

			const candidato = await getCandidato(usuarioId)

			const beneficiosOferecidosResult = await beneficioOferecidoData.getBeneficioOferecido(item.vagaid);
			item.beneficiosOferecidos = beneficiosOferecidosResult

			const tiposContratacaoEBeneficios = await tiposContratacaoEBeneficiosService.getTiposContratacaoEBeneficiosService(item.vagaid);
			
			const tiposContratacao = tiposContratacaoEBeneficios.tiposContratacao

			const contratacao = tiposContratacao.find(item2 => item.tipocontratacaoid === item2.tipocontratacaoid)

			item.tipoContratacao = contratacao

			const questionario = await getQuestionarioById(item.questionarioid)
			item.questionario = (questionario && questionario.length === 1) ? questionario[0] : questionario

			const empresa = await getEmpresaById(item.empresaid)
			item.empresa = empresa

			const candidaturas = await candidaturaService.getCandidaturaByCandidato(candidato[0].candidatoid);

			let candidatura = null
			if (candidaturas && candidaturas.length > 0) {
				candidatura = candidaturas.find(item => item.vagaid == vagaId)
			}

			item.candidatura = candidatura ? candidatura : null

			return item
		}))
		return result
	} else {
		throw new Error('Erro no servi??o getVagaById')
	}
}

exports.getVagaById = async function (vagaId) {
	return await vagaData.getVagaById(vagaId);
}

exports.saveVaga = async function (empresaId, questionarioId, tipoContratacaoId, vaga) {
	return await vagaData.saveVaga(empresaId, questionarioId, tipoContratacaoId, vaga);
}

exports.updateVaga = async function (id, vaga) {
	return await vagaData.updateVaga(id, vaga);
}

exports.deleteVaga = async function (vagaId) {
	const beneficiosOferecidos = await Promise.all([beneficioOferecidoData.deleteBeneficiosOferecidosByVaga(vagaId)])

	let vaga = []
	if (beneficiosOferecidos) {
		vaga = await vagaData.deleteVaga(vagaId);
	}

	return vaga
}