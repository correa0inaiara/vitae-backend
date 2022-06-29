const relatorioData = require('../data/relatorioData');
const { ufENUM } = require('../utils/enums');

const totalUsuarios = function(result) {
	let data = {}
	if (result && result.length > 0) {
		result.map(item => {
			const number = item.count ? Number(item.count) : item.count
			if (item.tipousuario === 'Candidato') {
				data.candidatos = number
			} else if (item.tipousuario === 'Empresa') {
				data.empresas = number
			} else {
				data.administrador = number
			}
		})
	}
	return data
}

const totalCurriculos = function(result) {
	let data = {}
	if (result && result.length > 0) {
		result.map(item => {
			const number = item.count ? Number(item.count) : item.count
			if (item.coluna === 'cursos') {
				data.cursos = number
			} else if (item.coluna === 'educacao') {
				data.educacao = number
			} if (item.coluna === 'experiencias') {
				data.experiencias = number
			} else if (item.coluna === 'habilidades') {
				data.habilidades = number
			} else if (item.coluna === 'idiomas') {
				data.idiomas = number
			}
		})
	}
	return data
}

const totalEstados = function(result) {
	let data = {}
	if (result && result.length > 0) {
		result.map((item, index) => {
			const number = item.count ? Number(item.count) : item.count
			switch (item.uf) {
				case ufENUM.AC:
					data[ufENUM.AC] = number
					break;
				case ufENUM.AL:
					data[ufENUM.AL] = number
					break;
				case ufENUM.AP:
					data[ufENUM.AP] = number
					break;
				case ufENUM.AM:
					data[ufENUM.AM] = number
					break;
				case ufENUM.BA:
					data[ufENUM.BA] = number
					break;
				case ufENUM.CE:
					data[ufENUM.CE] = number
					break;
				case ufENUM.DF:
					data[ufENUM.DF] = number
					break;
				case ufENUM.ES:
					data[ufENUM.ES] = number
					break;
				case ufENUM.GO:
					data[ufENUM.GO] = number
					break;
				case ufENUM.MA:
					data[ufENUM.MA] = number
					break;
				case ufENUM.MT:
					data[ufENUM.MT] = number
					break;
				case ufENUM.MS:
					data[ufENUM.MS] = number
					break;
				case ufENUM.MG:
					data[ufENUM.MG] = number
					break;
				case ufENUM.PA:
					data[ufENUM.PA] = number
					break;
				case ufENUM.PB:
					data[ufENUM.PB] = number
					break;
				case ufENUM.PR:
					data[ufENUM.PR] = number
					break;
				case ufENUM.PE:
					data[ufENUM.PE] = number
					break;
				case ufENUM.PI:
					data[ufENUM.PI] = number
					break;
				case ufENUM.RJ:
					data[ufENUM.RJ] = number
					break;
				case ufENUM.RN:
					data[ufENUM.RN] = number
					break;
				case ufENUM.RS:
					data[ufENUM.RS] = number
					break;
				case ufENUM.RO:
					data[ufENUM.RO] = number
					break;
				case ufENUM.RR:
					data[ufENUM.RR] = number
					break;
				case ufENUM.SC:
					data[ufENUM.SC] = number
					break;
				case ufENUM.SP:
					data[ufENUM.SP] = number
					break;
				case ufENUM.SE:
					data[ufENUM.SE] = number
					break;
				case ufENUM.TO:
					data[ufENUM.TO] = number
					break;
			}
		})
	}
	return data
}

const totalTabelas = function(result) {
	let data = {}
	if (result && result.length > 0) {
		result.map((item, index) => {
			const number = item.count ? Number(item.count) : item.count
			if (item.coluna === 'agendamentos') {
				data.agendamentos = number
			} else if (item.coluna === 'questionarios') {
				data.questionarios = number
			} if (item.coluna === 'curriculos') {
				data.curriculos = number
			} if (item.coluna === 'vagas') {
				data.vagas = number
			} else if (item.coluna === 'processos seletivos') {
				data.processosSeletivos = number
			}
		})
	}
	return data
}

exports.getRelatorios = async function () {
	const totalUsuariosPorTipo = await relatorioData.getTotalUsuariosPorTipo();
	const totalUsuariosData = totalUsuarios(totalUsuariosPorTipo)

	const totalIdiomasPorNivel = await relatorioData.getTotalIdiomasPorNivel();

	const totalEducacaoCursosExperienciasHabilidadesIdiomas = await relatorioData.getTotalEducacaoCursosExperienciasHabilidadesIdiomas();
	const totalCurriculosData = totalCurriculos(totalEducacaoCursosExperienciasHabilidadesIdiomas)

	const totalCurriculosQuestionariosVagasProcessosSeletivosAgendamentos = await relatorioData.getTotalCurriculosQuestionariosVagasProcessosSeletivosAgendamentos();
	const totalTabelasData = totalTabelas(totalCurriculosQuestionariosVagasProcessosSeletivosAgendamentos)


	const totalCandidatosPorEstado = await relatorioData.getTotalCandidatosPorEstado();
	const totalEstadosCandidatosData = totalEstados(totalCandidatosPorEstado)

	const totalEmpresasPorEstado = await relatorioData.getTotalEmpresasPorEstado();
	const totalEstadosEmpresasData = totalEstados(totalEmpresasPorEstado)

	const result = {
		totalUsuariosPorTipo: totalUsuariosData,
		totalIdiomasPorNivel,
		totalEducacaoCursosExperienciasHabilidadesIdiomas: totalCurriculosData,
		totalCurriculosQuestionariosVagasProcessosSeletivosAgendamentos: totalTabelasData,
		totalCandidatosPorEstado: totalEstadosCandidatosData,
		totalEmpresasPorEstado: totalEstadosEmpresasData
	}
	return result
}
