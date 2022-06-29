const database = require('../infra/database')
const { mapFields, handleDates } = require('../utils/utils');

exports.getExperiencias = async function () {
	const text = "SELECT * FROM experiencias;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getExperiencia = async function (curriculoId) {
	const text = "SELECT * FROM experiencias WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveExperiencia = async function (curriculoId, experiencia) {
	
	// experiencia.periodoInicial = handleDates(experiencia.periodoInicial);
	// experiencia.periodoFinal = handleDates(experiencia.periodoFinal);

	const text = "INSERT INTO experiencias (curriculoId, cargo, periodoInicial, periodoFinal, empresa) VALUES ($1, $2, $3, $4, $5) returning *"
	const values = [curriculoId, experiencia.cargo, experiencia.periodoInicial, experiencia.periodoFinal, experiencia.empresa];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateExperiencia = async function(experienciaID, experiencia) {

	// if (experiencia.periodoInicial && experiencia.periodoFinal) {
	// 	experiencia.periodoInicial = handleDates(experiencia.periodoInicial);
	// 	experiencia.periodoFinal = handleDates(experiencia.periodoFinal);
	// }

	const [text, values] =  mapFields(experienciaID, 'experienciaId', experiencia, 'experiencias');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteExperienciaByCurriculo = async function (curriculoId) {
	const text = "DELETE FROM experiencias WHERE curriculoId = $1;"
	const values = [curriculoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}


exports.deleteExperiencia = async function (id) {
	const text = "DELETE FROM experiencias WHERE experienciaId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
