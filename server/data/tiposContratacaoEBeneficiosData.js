const database = require('../infra/database')
const { mapFields, handleDates } = require('../utils/utils');

exports.getTiposContratacao = async function () {
	const text = "SELECT * FROM tiposcontratacao;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getBeneficios = async function () {
	const text = "SELECT * FROM beneficios;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
