const habilidadeData = require('../data/habilidadeData');

exports.getHabilidades = async function () {
	return await habilidadeData.getHabilidades();
}

exports.getHabilidade = async function (id) {
	return await habilidadeData.getHabilidade(id);
}

exports.saveHabilidade = async function (id, habilidades) {
	let habilidadeResponse = '';
	let habilidadesResponse = [];
	if (habilidades && habilidades.length > 0) {
		for (const habilidade of habilidades) {
			habilidadeResponse = await habilidadeData.saveHabilidade(id, habilidade);
			habilidadesResponse.push(habilidadeResponse[0]);
		}
	} else {
		habilidadesResponse = await habilidadeData.saveHabilidade(id, habilidades);
	}
	return habilidadesResponse;
}

exports.updateHabilidade = async function (id, habilidade) {
	return await habilidadeData.updateHabilidade(id, habilidade);
}

exports.deleteHabilidade = async function (id) {
	return await habilidadeData.deleteHabilidade(id);
}