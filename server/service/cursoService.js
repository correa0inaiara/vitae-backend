const cursoData = require('../data/cursoData');

exports.getCursos = async function () {
	return await cursoData.getCursos();
}

exports.getCurso = async function (id) {
	return await cursoData.getCurso(id);
}

exports.saveCurso = async function (id, cursos) {
	let cursoResponse = '';
	let cursosResponse = [];
	if (cursos && cursos.length > 1) {
		for (const curso of cursos) {
			cursoResponse = await cursoData.saveCurso(id, curso);
			cursosResponse.push(cursoResponse[0]);
		}
	} else if (cursos.length > 0) {
		const curso = Array.isArray(cursos) ? cursos[0] : cursos
		cursosResponse = await cursoData.saveCurso(id, curso);
	}
	return cursosResponse;
}

exports.updateCurso = async function (id, curso) {
	return await cursoData.updateCurso(id, curso);
}

exports.deleteCurso = async function (id) {
	return await cursoData.deleteCurso(id);
}