const database = require('../infra/database')
const { mapFields, handleDates } = require('../utils/utils');

exports.getAgendamentos = async function () {
	const text = "SELECT * FROM agendamentos;"
	try {
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getAgendamento = async function (processoSeletivoId) {
	const text = "SELECT * FROM agendamentos WHERE processoSeletivoId = $1;"
	const values = [processoSeletivoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getAgendamentosByCandidato = async function (usuarioId) {
	const text = `
		select u.usuarioid, e.nomedaempresa, a.agendamentoid, a.processoseletivoid, a.candidatoselecionadoid, a.motivo, a.dia, a.hora, a.localizacao  
		from agendamentos a
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
		and a.agendamentoid notnull;
	`
	const values = [usuarioId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getAgendamentosByEmpresa = async function (usuarioId) {
	const text = `
		select u.usuarioid, c3.nomecompleto, a.agendamentoid, a.processoseletivoid, a.candidatoselecionadoid, a.motivo, a.dia, a.hora, a.localizacao  
		from agendamentos a
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
		and a.agendamentoid notnull;
	`
	const values = [usuarioId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveAgendamento = async function (processoSeletivoId, candidatoSelecionadoId, agendamento) {
	const text = "INSERT INTO agendamentos (processoSeletivoId, candidatoSelecionadoId, motivo, dia, hora, localizacao) VALUES ($1, $2, $3, $4, $5, $6) returning *"
	const values = [processoSeletivoId, candidatoSelecionadoId, agendamento.motivo, agendamento.dia, agendamento.hora, agendamento.localizacao];

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateAgendamento = async function(agendamentoId, agendamento) {
	const [text, values] =  mapFields(agendamentoId, 'agendamentoId', agendamento, 'agendamentos');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteAgendamento = async function (id) {
	const text = "DELETE FROM agendamentos WHERE agendamentoId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
