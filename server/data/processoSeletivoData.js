const database = require('../infra/database')
const { mapFields, formatDateToDB } = require('../utils/utils');

exports.getProcessosSeletivos = async function () {
	const text = "SELECT * FROM processosSeletivos;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getProcessoSeletivoById = async function (processoSeletivoId) {
	const text = "SELECT * FROM processosSeletivos WHERE processoSeletivoId = $1;"
	const values = [processoSeletivoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getProcessoSeletivo = async function (empresaId) {
	const text = "SELECT * FROM processosSeletivos WHERE empresaId = $1;"
	const values = [empresaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getEmpresaByProcessoSeletivo = async function (processoSeletivoId) {
	const text = `
		select e.nomedaempresa, p.nome
		from processosseletivos p 
		full join empresas e 
		on p.empresaid = e.empresaid
		where p.processoseletivoid = $1
	`
	const values = [processoSeletivoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveProcessoSeletivo = async function (empresaId, vagaId, processoSeletivo) {
	const text = "INSERT INTO processosSeletivos (empresaId, vagaId, nome, descricao) VALUES ($1, $2, $3, $4) returning *"
	const values = [empresaId, vagaId, processoSeletivo.nome, processoSeletivo.descricao];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateProcessoSeletivo = async function(empresaId, processoSeletivo) {
	const [text, values] =  mapFields(empresaId, 'processoSeletivoId', processoSeletivo, 'processosSeletivos');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteProcessoSeletivo = async function (id) {
	const text = "DELETE FROM processosSeletivos WHERE processoSeletivoId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
