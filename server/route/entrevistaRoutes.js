const express = require('express');
const router = express.Router();
const entrevistaService = require('../service/entrevistaService');
const { isAutenticated } = require('../utils/utils');

router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const entrevistas = await entrevistaService.getEntrevistas();
				res.status(200).json(entrevistas);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.get('/:id', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const entrevistaId = req.params.id;
				const entrevista = await entrevistaService.getEntrevista(entrevistaId);
				if (entrevista.length > 0) {
					res.status(200).json(entrevista);
				} else res.status(404).json({message: 'ID inválido ou não existe.'});
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.get('/processoseletivo/:id', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const processoSeletivoId = req.params.id;
				const entrevista = await entrevistaService.getEntrevistaByProcessoSeletivo(processoSeletivoId);
				res.status(200).json(entrevista);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.get('/usuario/:id', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const usuarioId = req.params.id;
				const entrevista = await entrevistaService.getEntrevistaByUsuario(usuarioId);
				res.status(200).json(entrevista);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.post('/:id', async function (req, res, next) {
	try {
		const id = req.params.id;
		const body = req.body;
		const candidatoSelecionadoId = req.query.candidatoSelecionadoId;
		const entrevista = await entrevistaService.saveEntrevista(id, candidatoSelecionadoId, body);
		res.status(201).json(entrevista);
	} catch (error) {
		next(error)
	}
});

router.put('/:id', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const id = req.params.id;
				const body = req.body;
				const entrevista = await entrevistaService.updateEntrevista(id, body);
				res.status(200).json(entrevista);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.delete('/:id', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const id = req.params.id;
				const entrevista = await entrevistaService.deleteEntrevista(id);
				res.status(201).json(entrevista);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;