const database = require('../infra/database')
const { mapFields, handleDates } = require('../utils/utils');

exports.getEntrevistas = async function () {
	const text = "SELECT * FROM entrevistas;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getEntrevistaById = async function (entrevistaId) {
	const text = "SELECT * FROM entrevistas WHERE entrevistaId = $1;"
	const values = [entrevistaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getEntrevistaByProcessoSeletivo = async function (processoSeletivoId) {
	const text = "SELECT * FROM entrevistas WHERE processoSeletivoId = $1;"
	const values = [processoSeletivoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getEntrevistasByCandidato = async function (usuarioId) {
	const text = `
		select u.usuarioid, e.nomedaempresa, a.entrevistaid, a.processoseletivoid, a.candidatoselecionadoid, a.motivo, a.dia, a.hora, a.localizacao  
		from entrevistas a
		full join candidatosselecionados c
		on a.candidatoselecionadoid = c.candidatoselecionadoid  
		full join candidaturas c2
		on c.candidaturaid = c2.candidaturaid 
		full join candidatos c3 
		on c2.candidatoid = c3.candidatoid 
		full join usuarios u 
		on c3.usuarioid = u.usuarioid
		full join processosseletivos p
		on a.processoseletivoid = p.processoseletivoid 
		full join empresas e 
		on p.empresaid = e.empresaid 
		where u.usuarioid = $1
		and a.entrevistaid notnull;
	`
	const values = [usuarioId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getEntrevistasByEmpresa = async function (usuarioId) {
	const text = `
		select u.usuarioid, c3.nomecompleto, a.entrevistaid, a.processoseletivoid, a.candidatoselecionadoid, a.motivo, a.dia, a.hora, a.localizacao  
		from entrevistas a
		full join processosseletivos p
		on a.processoseletivoid = p.processoseletivoid 
		full join empresas e 
		on p.empresaid = e.empresaid
		full join usuarios u 
		on e.usuarioid  = u.usuarioid 
		full join candidatosselecionados c
		on a.candidatoselecionadoid = c.candidatoselecionadoid  
		full join candidaturas c2
		on c.candidaturaid = c2.candidaturaid 
		full join candidatos c3 
		on c2.candidatoid = c3.candidatoid 
		where u.usuarioid = $1
		and a.entrevistaid notnull;
	`
	const values = [usuarioId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveEntrevista = async function (processoSeletivoId, candidatoSelecionadoId, entrevista) {
	const text = "INSERT INTO entrevistas (processoSeletivoId, candidatoSelecionadoId, motivo, dia, hora, localizacao) VALUES ($1, $2, $3, $4, $5, $6) returning *"
	const values = [processoSeletivoId, candidatoSelecionadoId, entrevista.motivo, entrevista.dia, entrevista.hora, entrevista.localizacao];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateEntrevista = async function(entrevistaId, entrevista) {
	const [text, values] =  mapFields(entrevistaId, 'entrevistaId', entrevista, 'entrevistas');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteEntrevista = async function (id) {
	const text = "DELETE FROM entrevistas WHERE entrevistaId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
