const database = require('../infra/database')
const { mapFields, formatDateToDB } = require('../utils/utils');

exports.getEmpresas = async function () {
	const text = "SELECT * FROM empresas;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getEmpresa = async function (userId) {
	const text = "SELECT * FROM empresas WHERE usuarioID = $1;"
	const values = [userId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getEmpresaById = async function (empresaId) {
	const text = "SELECT * FROM empresas WHERE empresaId = $1;"
	const values = [empresaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getEmpresaByCNPJ = async function (userCnpj) {
	const text = "SELECT * FROM empresas WHERE cnpj = $1;"
	const values = [userCnpj]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveEmpresa = async function (userID, empresa) {
	const text = "INSERT INTO empresas (usuarioid, nomeDaEmpresa, cnpj, ramoDaEmpresa, numeroDeFuncionarios, website) VALUES ($1, $2, $3, $4, $5, $6) returning *"
	const values = [userID, empresa.nomeDaEmpresa, empresa.cnpj, empresa.ramoDaEmpresa, empresa.numeroDeFuncionarios, empresa.website];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateEmpresa = async function(empresaId, empresa) {
	const [text, values] =  mapFields(empresaId, 'empresaId', empresa, 'empresas');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteEmpresa = async function (id) {
	const text = "DELETE FROM empresas WHERE empresaId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
