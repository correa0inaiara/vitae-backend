const database = require('../infra/database')
const { mapFields } = require('../utils/utils');

exports.getVagas = async function () {
	try {
		const text = `
		SELECT v.nome, v.descricao, tc.contratacao, v.localizacao, 
		v.salario, to_char(v.prazo, 'DD-MM-YYYY HH24:MI:SS') prazo_vaga, v.status, JSON_AGG(DISTINCT b.beneficio) beneficios, 
		q.questionarioID, q.nome as nome_questionario, q.descricao as descricao_questionario, 
		to_char(q.prazo, 'DD-MM-YYYY HH24:MI:SS') prazo_questionario, JSON_AGG(DISTINCT p.pergunta) perguntas, 
		e.nomedaempresa, e.cnpj, e.ramodaempresa, e.numerodefuncionarios, e.website
		FROM vagas v
		LEFT JOIN beneficiosOferecidos USING (vagaID)
		LEFT JOIN beneficios b USING (beneficioID)
		LEFT JOIN tiposContratacao tc USING (tipoContratacaoID)
		LEFT JOIN questionarios q USING (questionarioID)
		LEFT JOIN perguntas p USING (questionarioID)
		LEFT JOIN empresas e 
		ON v.empresaID = e.empresaID
		GROUP BY v.vagaID, tc.tipoContratacaoID, q.questionarioID, e.empresaID;`
		const res = await database.query(text);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getVaga = async function (vagaId) {
	const text = `
		SELECT v.nome, v.descricao, tc.contratacao, v.localizacao, 
		v.salario, to_char(v.prazo, 'DD-MM-YYYY HH24:MI:SS') prazo_vaga, v.status, JSON_AGG(DISTINCT b.beneficio) beneficios,
		q.questionarioID, q.nome as nome_questionario, q.descricao as descricao_questionario, 
		to_char(q.prazo, 'DD-MM-YYYY HH24:MI:SS') prazo_questionario, JSON_AGG(DISTINCT p.pergunta) perguntas, 
		e.nomedaempresa, e.cnpj, e.ramodaempresa, e.numerodefuncionarios, e.website
		FROM vagas v
		LEFT JOIN beneficiosOferecidos USING (vagaID)
		LEFT JOIN beneficios b USING (beneficioID)
		LEFT JOIN tiposContratacao tc USING (tipoContratacaoID)
		LEFT JOIN questionarios q USING (questionarioID)
		LEFT JOIN perguntas p USING (questionarioID)
		LEFT JOIN empresas e 
		ON v.empresaID = e.empresaID
		WHERE v.vagaid = $1
		GROUP BY v.vagaID, tc.tipoContratacaoID, q.questionarioID, e.empresaID`
	const values = [vagaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getVagaByEmpresaId = async function (empresaId) {
	const text = `
		SELECT v.nome, v.descricao, tc.contratacao, v.localizacao, 
		v.salario, to_char(v.prazo, 'DD-MM-YYYY HH24:MI:SS') prazo_vaga, 
		v.status, JSON_AGG(DISTINCT b.beneficio) beneficios, q.questionarioID, 
		q.nome as nome_questionario, q.descricao as descricao_questionario, 
		to_char(q.prazo, 'DD-MM-YYYY HH24:MI:SS') prazo_questionario, 
		JSON_AGG(DISTINCT p.pergunta) perguntas
		FROM vagas v
		LEFT JOIN beneficiosOferecidos USING (vagaID)
		LEFT JOIN beneficios b USING (beneficioID)
		LEFT JOIN tiposContratacao tc USING (tipoContratacaoID)
		LEFT JOIN questionarios q USING (questionarioID)
		LEFT JOIN perguntas p USING (questionarioID)
		LEFT JOIN empresas e 
		ON v.empresaID = e.empresaID
		WHERE e.empresaID = $1
		GROUP BY v.vagaID, tc.tipoContratacaoID, q.questionarioID, e.empresaID;`
	const values = [empresaId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.getVagaByCandidatoId = async function (candidatoId) {
	const text = `
		SELECT v.nome, v.descricao, tc.contratacao, v.localizacao, 
		v.salario, to_char(v.prazo, 'DD-MM-YYYY HH24:MI:SS') prazo_vaga, 
		v.status, JSON_AGG(DISTINCT b.beneficio) beneficios, q.questionarioID, 
		q.nome as nome_questionario, q.descricao as descricao_questionario, 
		to_char(q.prazo, 'DD-MM-YYYY HH24:MI:SS') prazo_questionario, 
		JSON_AGG(DISTINCT p.pergunta) perguntas, 
		JSON_AGG(DISTINCT r.resposta) respostas
		FROM vagas v
		LEFT JOIN beneficiosOferecidos USING (vagaID)
		LEFT JOIN beneficios b USING (beneficioID)
		LEFT JOIN tiposContratacao tc USING (tipoContratacaoID)
		LEFT JOIN questionarios q USING (questionarioID)
		LEFT JOIN perguntas p USING (questionarioID)
		LEFT JOIN respostas r USING (perguntasID)
		LEFT JOIN candidaturas ct USING (candidaturaID)
		LEFT JOIN candidatos c
		ON ct.candidatoID = c.candidatoID
		WHERE c.candidatoID = $1
		GROUP BY v.vagaID, tc.tipoContratacaoID, q.questionarioID, r.respostasID;
	`
	const values = [candidatoId]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.saveVaga = async function (empresaId, questionarioId, tipoContratacaoId, vaga) {
	
	const text = "INSERT INTO vagas (empresaId, questionarioId, tipoContratacaoId, nome, descricao, localizacao, salario, prazo, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *"
	const values = [empresaId, questionarioId, tipoContratacaoId, vaga.nome, vaga.descricao, vaga.localizacao, vaga.salario, vaga.prazo, vaga.status];
	
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.updateVaga = async function(id, vaga) {

	const [text, values] =  mapFields(id, 'vagaId', vaga, 'vagas');

	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}

exports.deleteVaga = async function (id) {
	const text = "DELETE FROM vagas WHERE vagaId = $1;"
	const values = [id]
	try {
		const res = await database.query(text, values);
		return res.rows;
	} catch (error) {
		return error.stack;
	}
}
