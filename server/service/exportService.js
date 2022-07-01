const { exportToCSV, readCSV } = require('../utils/utils');
const curriculoData = require('../data/curriculoData');
const questionarioData = require('../data/questionarioData');
const processoSeletivosData = require('../data/processoSeletivoData');
const vagasData = require('../data/vagaData');
const agendamentoData = require('../data/agendamentoData');

exports.getCSVFile = async function (recursoId, tableName) {

	let request = []
	switch (tableName) {
		case 'curriculos':
			request = await curriculoData.getCurriculoById(recursoId);	
			break;
		case 'questionarios':
			request = await questionarioData.getQuestionarioById(recursoId);	
			break;
		case 'processosseletivos':
			request = await processoSeletivosData.getProcessoSeletivoById(recursoId);
			break;
		case 'vagas':
			request = await vagasData.getVagaById(recursoId);	
			break;
		case 'agendamentos':
			request = await agendamentoData.getAgendamentoById(recursoId);	
			break;
		default:
			break;
	}

	const dir = "server/csv"
	const filename = `${tableName}-${recursoId}.csv`;
	const filepath = `${dir}/${filename}`;
	
	const read = await exportToCSV(tableName, filepath, request)

	// const read = await readCSV(filepath)

	const result = {
		filename,
		data: read
	}
	return result
}