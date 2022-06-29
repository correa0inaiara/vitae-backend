const tiposContratacaoEBeneficiosData = require('../data/tiposContratacaoEBeneficiosData');

exports.getTiposContratacaoEBeneficiosService = async function () {
	const tiposContratacao = await tiposContratacaoEBeneficiosData.getTiposContratacao();
	
	// let tiposContratacaoArr = []
	// if (tiposContratacao && tiposContratacao.length > 0) {
	// 	tiposContratacao.map(item => {
	// 		// if (item.obrigatorio) {
	// 		// 	beneficiosObrigatorios.push(item.beneficio)
	// 		// } else {
	// 		// 	beneficiosOpcionais.push(item.beneficio)
	// 		// }
	// 		tiposContratacaoArr.push(item.contratacao)
	// 	})
	// }
	
	const beneficios = await tiposContratacaoEBeneficiosData.
	getBeneficios();
	
	// let beneficiosObrigatorios = []
	// let beneficiosOpcionais = []
	// let beneficiosArr = []
	// if (beneficios && beneficios.length > 0) {
	// 	beneficios.map(item => {
	// 		// if (item.obrigatorio) {
	// 		// 	beneficiosObrigatorios.push(item.beneficio)
	// 		// } else {
	// 		// 	beneficiosOpcionais.push(item.beneficio)
	// 		// }
	// 		beneficiosArr.push(item.beneficio)
	// 	})
	// }
	
	const data = {
		tiposContratacao,
		beneficios
	}
	return data
}