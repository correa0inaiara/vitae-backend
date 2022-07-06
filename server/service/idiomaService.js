const idiomaData = require('../data/idiomaData');

exports.getIdiomas = async function () {
	return await idiomaData.getIdiomas();
}

exports.getIdioma = async function (id) {
	return await idiomaData.getIdioma(id);
}

exports.saveIdioma = async function (id, idiomas) {
	let idiomaResponse = '';
	let idiomasResponse = [];
	if (idiomas && idiomas.length > 1) {
		for (const idioma of idiomas) {
			idiomaResponse = await idiomaData.saveIdioma(id, idioma);
			idiomasResponse.push(idiomaResponse[0]);
		}
	} else if (idiomas.length > 0) {
		const idioma = Array.isArray(idiomas) ? idiomas[0] : idiomas
		idiomasResponse = await idiomaData.saveIdioma(id, idioma);
	}
	return idiomasResponse;
}

exports.updateIdioma = async function (id, idioma) {
	return await idiomaData.updateIdioma(id, idioma);
}

exports.deleteIdioma = async function (id) {
	return await idiomaData.deleteIdioma(id);
}