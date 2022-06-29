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
	if (idiomas && idiomas.length > 0) {
		for (const idioma of idiomas) {
			idiomaResponse = await idiomaData.saveIdioma(id, idioma);
			idiomasResponse.push(idiomaResponse[0]);
		}
	} else {
		idiomasResponse = await idiomaData.saveIdioma(id, idiomas);
	}
	return idiomasResponse;
}

exports.updateIdioma = async function (id, idioma) {
	return await idiomaData.updateIdioma(id, idioma);
}

exports.deleteIdioma = async function (id) {
	return await idiomaData.deleteIdioma(id);
}