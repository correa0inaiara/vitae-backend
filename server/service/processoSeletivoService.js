const processoSeletivoData = require('../data/processoSeletivoData');
const vagaData = require('../data/vagaData');

exports.getProcessosSeletivos = async function () {
	return await processoSeletivoData.getProcessosSeletivos();
}

exports.getProcessoSeletivo = async function (id) {
	const processosSeletivos = await processoSeletivoData.getProcessoSeletivo(id);

	if (processosSeletivos && processosSeletivos.length > 0) {
		await Promise.all(processosSeletivos.map(async item => {
			const vaga = await vagaData.getVagaById(item.vagaid)
			item.vaga = vaga[0]
			return item
		}))
	}
	return processosSeletivos
}

exports.saveProcessoSeletivo = async function (id, vagaId, processosSeletivo) {
	return await processoSeletivoData.saveProcessoSeletivo(id, vagaId, processosSeletivo);
}

exports.updateProcessoSeletivo = async function (id, processoSeletivo) {
	return await processoSeletivoData.updateProcessoSeletivo(id, processoSeletivo);
}

exports.deleteProcessoSeletivo = async function (id) {
	return await processoSeletivoData.deleteProcessoSeletivo(id);
}