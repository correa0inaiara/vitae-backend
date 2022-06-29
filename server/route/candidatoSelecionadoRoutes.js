const express = require('express');
const router = express.Router();
const candidatoSelecionadoService = require('../service/candidatoSelecionadoService');
const { isAutenticated } = require('../utils/utils');

router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const candidatosSelecionados = await candidatoSelecionadoService.getCandidatoSelecionados();
				res.status(200).json(candidatosSelecionados);
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
				const processoSeletivoId = req.params.id;
				const candidatoSelecionado = await candidatoSelecionadoService.getCandidatoSelecionado(processoSeletivoId);
				res.status(200).json(candidatoSelecionado);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.post('/:id', async function (req, res, next) {
	try {
		const id = req.params.id;
		const candidaturaId = req.query.candidaturaId;
		const candidatoSelecionado = await candidatoSelecionadoService.saveCandidatoSelecionado(id, candidaturaId);
		res.status(201).json(candidatoSelecionado);
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
				const candidatoSelecionado = await candidatoSelecionadoService.updateCandidatoSelecionado(id, body);
				res.status(200).json(candidatoSelecionado);
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
				const candidatoSelecionado = await candidatoSelecionadoService.deleteCandidatoSelecionado(id);
				res.status(201).json(candidatoSelecionado);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;