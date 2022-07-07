const database = require('../infra/database')
const { mapFields } = require('../utils/utils');

exports.getBeneficiosOferecidos = async function () {
	const text = "SELECT * FROM beneficiosOferecidos;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getBeneficioOferecido = async function (vagaId) {
	const text = `
		select * from beneficiosoferecidos b 
		full join beneficios b2 
		on b.beneficioid = b2.beneficioid 
		where b.vagaid = $1;
	`
	const values = [vagaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveBeneficioOferecido = async function (vagaId, beneficioId) {
	const text = "INSERT INTO beneficiosOferecidos (vagaId, beneficioId) VALUES ($1, $2) returning *"
	const values = [vagaId, beneficioId];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateBeneficioOferecido = async function(id, body) {
	const [text, values] =  mapFields(id, 'vagaId', body, 'beneficiosOferecidos');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteBeneficiosOferecidosByVaga = async function (vagaId) {
	const text = "DELETE FROM beneficiosOferecidos WHERE vagaId = $1;"
	const values = [vagaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteBeneficioOferecido = async function (id) {
	const text = "DELETE FROM beneficiosOferecidos WHERE beneficiosoferecidosid = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
