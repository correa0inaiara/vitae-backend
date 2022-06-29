const experienciaData = require('../data/experienciaData');

exports.getExperiencias = async function () {
	return await experienciaData.getExperiencias();
}

exports.getExperiencia = async function (id) {
	return await experienciaData.getExperiencia(id);
}

exports.saveExperiencia = async function (id, experiencias) {
	let experienciaResponse = '';
	let experienciaResponses = [];
	if (experiencias && experiencias.length > 0) {
		for (const experiencia of experiencias) {
			experienciaResponse = await experienciaData.saveExperiencia(id, experiencia);
			experienciaResponses.push(experienciaResponse[0]);
		}
	} else {
		experienciaResponses = await experienciaData.saveExperiencia(id, experiencias);
	}
	return experienciaResponses;
}

exports.updateExperiencia = async function (id, experiencia) {
	return await experienciaData.updateExperiencia(id, experiencia);
}

exports.deleteExperiencia = async function (id) {
	return await experienciaData.deleteExperiencia(id);
}