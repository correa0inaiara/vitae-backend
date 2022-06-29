const beneficioOferecidoData = require('../data/beneficioOferecidoData');

exports.getBeneficiosOferecidos = async function () {
	return await beneficioOferecidoData.getBeneficiosOferecidos();
}

exports.getBeneficioOferecido = async function (id) {
	return await beneficioOferecidoData.getBeneficioOferecido(id);
}

exports.saveBeneficioOferecido = async function (vagaId, beneficioId) {
	return await beneficioOferecidoData.saveBeneficioOferecido(vagaId, beneficioId);
}

exports.updateBeneficioOferecido = async function (vagaId, body) {
	const beneficiosExcluidos = body.beneficiosExcluidos
	const beneficiosAdicionados = body.beneficiosAdicionados

	if (beneficiosExcluidos && beneficiosExcluidos.length > 0) {
		beneficiosExcluidos.map(async item => {
			const excludeResult = await beneficioOferecidoData.deleteBeneficioOferecido(item.beneficiosoferecidosid)
		})
	}

	if (beneficiosAdicionados && beneficiosAdicionados.length > 0) {
		beneficiosAdicionados.map(async item => {
			const additionResult = await beneficioOferecidoData.saveBeneficioOferecido(vagaId, item.beneficioid)
		})
	}
	
	const newResult = await beneficioOferecidoData.getBeneficioOferecido(vagaId)
	
	return newResult
}

exports.deleteBeneficioOferecido = async function (id) {
	return await beneficioOferecidoData.deleteBeneficioOferecido(id);
}