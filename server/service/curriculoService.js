const curriculoData = require('../data/curriculoData');
const cursoData = require('../data/cursoData');
const educacaoData = require('../data/educacaoData');
const experienciaData = require('../data/experienciaData');
const habilidadeData = require('../data/habilidadeData');
const idiomaData = require('../data/idiomaData');

const cursoService = require('../service/cursoService');
const educacaoService = require('../service/educacaoService');
const experienciaService = require('../service/experienciaService');
const habilidadeService = require('../service/habilidadeService');
const idiomaService = require('../service/idiomaService');

exports.getCurriculos = async function () {
	return await curriculoData.getCurriculos();
}

exports.getCurriculo = async function (usuarioId) {

	const curriculos =  await curriculoData.getCurriculo(usuarioId);
	
	if (curriculos && curriculos.length > 0) {
		await Promise.all(curriculos.map(async item => {
			const curriculoId = item.curriculoid

			if (curriculoId) {

				if (curriculoId) {
					const cursos = await cursoData.getCurso(curriculoId)
					const educacao = await educacaoData.getEducacaoById(curriculoId)
					const experiencias = await experienciaData.getExperiencia(curriculoId)
					const habilidades = await habilidadeData.getHabilidade(curriculoId)
					const idiomas = await idiomaData.getIdioma(curriculoId)

					item.cursos = cursos
					item.educacao = educacao
					item.experiencias = experiencias
					item.habilidades = habilidades
					item.idiomas = idiomas
				}
			}
		}))
	}

	return curriculos

}

exports.getCurriculoById = async function (curriculoId) {
	let [curriculo, cursos, educacao, experiencias, habilidades, idiomas] = await Promise.all(
		[curriculoData.getCurriculoById(curriculoId), 
		cursoData.getCurso(curriculoId),
		educacaoData.getEducacaoById(curriculoId),
		experienciaData.getExperiencia(curriculoId),
		habilidadeData.getHabilidade(curriculoId),
		idiomaData.getIdioma(curriculoId)])

        console.log("🚀 ~ file: curriculoService.js ~ line 59 ~ curriculo", curriculo)
		curriculo[0].cursos = cursos
		curriculo[0].educacao = educacao
		curriculo[0].experiencias = experiencias
		curriculo[0].habilidades = habilidades
		curriculo[0].idiomas = idiomas
		return curriculo
}

exports.saveCurriculo = async function (usuarioId, data) {
	const curriculoObj = {
		nome: data.nome,
		descricao: data.descricao
	}
	const curriculo =  await curriculoData.saveCurriculo(usuarioId, curriculoObj);
	const curriculoId = curriculo[0].curriculoid
	
	if (curriculoId) {
		let [cursos, educacao, experiencias, habilidades, idiomas] = await Promise.all(
			[cursoService.saveCurso(curriculoId, data.cursos),
			educacaoService.saveEducacao(curriculoId, data.educacao),
			experienciaService.saveExperiencia(curriculoId, data.experiencias),
			habilidadeService.saveHabilidade(curriculoId, data.habilidades),
			idiomaService.saveIdioma(curriculoId, data.idiomas)])
	
			curriculo[0].cursos = cursos
			curriculo[0].educacao = educacao
			curriculo[0].experiencias = experiencias
			curriculo[0].habilidades = habilidades
			curriculo[0].idiomas = idiomas
			return curriculo
	}
	
}

exports.updateCurriculo = async function (curriculoId, data) {

	const cursosArr = data.cursos.cursos
	const cursosAdicionados = data.cursos.cursosAdicionados
	const cursosExcluidos = data.cursos.cursosExcluidos

	const educacaoArr = data.educacao.educacao
	const educacaoAdicionados = data.educacao.educacaoAdicionados
	const educacaoExcluidos = data.educacao.educacaoExcluidos

	const experienciasArr = data.experiencias.experiencias
	const experienciasAdicionadas = data.experiencias.experienciasAdicionadas
	const experienciasExcluidas = data.experiencias.experienciasExcluidas
	
	const habilidadesArr = data.habilidades.habilidades
	const habilidadesAdicionadas = data.habilidades.habilidadesAdicionadas
	const habilidadesExcluidas = data.habilidades.habilidadesExcluidas
	
	const idiomasArr = data.idiomas.idiomas
	const idiomasAdicionados = data.idiomas.idiomasAdicionados
	const idiomasExcluidos = data.idiomas.idiomasExcluidos


	let curriculoDataObj = {
		nome: data.nome,
		descricao: data.descricao
	}

	let curriculo = await curriculoData.updateCurriculo(curriculoId, curriculoDataObj)


	let updateCursos = []
	if (cursosArr && cursosArr.length > 0) {
		cursosArr.map(async item => {
			if (item.cursoid) {
				let cursoObj = {
					curso: item.curso,
					localizacao: item.localizacao,
					duracaoemhoras: item.duracaoemhoras
				}
				const cursos = await cursoService.updateCurso(item.cursoId, cursoObj)
			}
		})
	}

	let addCursos = []
	if (cursosAdicionados && cursosAdicionados.length > 0) {
		cursosAdicionados.map(async item => {
			let cursoObj = {
				curso: item.curso,
				localizacao: item.localizacao,
				duracaoemhoras: item.duracaoemhoras
			}
			const result = await cursoService.saveCurso(curriculoId, cursoObj);
		})
	}

	let delCursos = []
	if (cursosExcluidos && cursosExcluidos.length > 0) {
		cursosExcluidos.map(async item => {
			const result = await cursoService.deleteCurso(item.cursoid);
		})
	}


	let updateEducacao = []
	if (educacaoArr && educacaoArr.length > 0) {
		educacaoArr.map(async item => {
			if (item.educacaoid) {
				let educacaoObj = {
					educacao: item.educacao,
					localizacao: item.localizacao,
					periodoinicial: item.periodoinicial,
					periodofinal: item.periodofinal
				}
				const experiencias = await educacaoService.updateEducacao(item.educacaoId, educacaoObj)
			}
		})
	}

	let addEducacao = []
	if (educacaoAdicionados && educacaoAdicionados.length > 0) {
		educacaoAdicionados.map(async item => {
			let educacaoObj = {
				educacao: item.educacao,
				localizacao: item.localizacao,
				periodoinicial: item.periodoinicial,
				periodofinal: item.periodofinal
			}
			const result = await educacaoService.saveEducacao(curriculoId, educacaoObj);
		})
	}

	let delEducacao = []
	if (educacaoExcluidos && educacaoExcluidos.length > 0) {
		educacaoExcluidos.map(async item => {
			const result = await educacaoService.deleteEducacao(item.experienciaid);
		})
	}

	
	let updateExperiencias = []
	if (experienciasArr && experienciasArr.length > 0) {
		experienciasArr.map(async item => {
			if (item.habilidadeid) {
				let experienciasObj = {
					cargo: item.cargo,
					empresa: item.empresa,
					periodoinicial: item.periodoinicial,
					periodofinal: item.periodofinal
				}
				const experiencias = await experienciaService.updateExperiencia(item.experienciaId, experienciasObj)
			}
		})
	}

	let addExperiencias = []
	if (experienciasAdicionadas && experienciasAdicionadas.length > 0) {
		experienciasAdicionadas.map(async item => {
			let experienciasObj = {
				cargo: item.cargo,
				empresa: item.empresa,
				periodoinicial: item.periodoinicial,
				periodofinal: item.periodofinal
			}
			const result = await experienciaService.saveExperiencia(curriculoId, experienciasObj);
		})
	}

	let delExperiencias = []
	if (experienciasExcluidas && experienciasExcluidas.length > 0) {
		experienciasExcluidas.map(async item => {
			const result = await experienciaService.deleteExperiencia(item.experienciaid);
		})
	}


	let updateHabilidades = []
	if (habilidadesArr && habilidadesArr.length > 0) {
		habilidadesArr.map(async item => {
			if (item.habilidadeid) {
				let habilidadesObj = {
					habilidade: item.habilidade,
					nivel: item.nivel
				}
				const habilidades = await habilidadeService.updateHabilidade(item.habilidadeId, habilidadesObj)
			}
		})
	}

	let addHabilidades = []
	if (habilidadesAdicionadas && habilidadesAdicionadas.length > 0) {
		habilidadesAdicionadas.map(async item => {
			let habilidadesObj = {
				habilidade: item.habilidade,
				nivel: item.nivel
			}
			const result = await habilidadeService.saveHabilidade(curriculoId, habilidadesObj);
		})
	}

	let delHabilidades = []
	if (habilidadesExcluidas && habilidadesExcluidas.length > 0) {
		habilidadesExcluidas.map(async item => {
			const result = await habilidadeService.deleteHabilidade(item.habilidadeid);
		})
	}
	

	let updateIdiomas = []
	if (idiomasArr && idiomasArr.length > 0) {
		idiomasArr.map(async item => {
			if (item.idiomaid) {
				let idiomasObj = {
					idioma: item.idioma,
					nivel: item.nivel
				}
				const idiomas = await idiomaService.updateIdioma(item.idiomaid, idiomasObj)
			}
		})
	}

	let addIdiomas = []
	if (idiomasAdicionados && idiomasAdicionados.length > 0) {
		idiomasAdicionados.map(async item => {
			let idiomasObj = {
				idioma: item.idioma,
				nivel: item.nivel
			}
			const result = await idiomaService.saveIdioma(curriculoId, idiomasObj);
		})
	}

	let delIdiomas = []
	if (idiomasExcluidos && idiomasExcluidos.length > 0) {
		idiomasExcluidos.map(async item => {
			const result = await idiomaService.deleteIdioma(item.idiomaid);
		})
	}

	return curriculo
}

exports.deleteCurriculo = async function (curriculoId) {

	let [cursos, educacao, experiencias, habilidades, idiomas] = await Promise.all(
		[cursoData.deleteCursoByCurriculo(curriculoId),
		educacaoData.deleteEducacaoByCurriculo(curriculoId),
		experienciaData.deleteExperienciaByCurriculo(curriculoId),
		habilidadeData.deleteHabilidadeByCurriculo(curriculoId),
		idiomaData.deleteIdiomaByCurriculo(curriculoId)])

	const curriculo = await curriculoData.deleteCurriculo(curriculoId);

	return curriculo
}