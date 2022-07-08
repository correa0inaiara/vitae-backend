const express = require('express');
const router = express.Router();
const vagaService = require('../service/vagaService');
const { isAutenticated } = require('../utils/utils');

router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const vagas = await vagaService.getVagas();
				res.status(200).json(vagas);
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
				const id = req.params.id;
				const usuarioId = req.query.usuarioId
				const vaga = await vagaService.getVagaCandidaturaById(id, usuarioId);
				res.status(200).json(vaga);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.get('/empresa/:id', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const id = req.params.id;
				const vaga = await vagaService.getVaga(id);
				res.status(200).json(vaga);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.post('/:id', async function (req, res, next) {
	try {
		const empresaId = req.params.id;
		const tipoContratacaoId = req.query.tipoContratacaoId;
		const questionarioId = req.query.questionarioId;
		const body = req.body;
		
		const vaga = await vagaService.saveVaga(empresaId, questionarioId, tipoContratacaoId, body);
		res.status(201).json(vaga);
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
				const vaga = await vagaService.updateVaga(id, body);
				res.status(200).json(vaga);
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
				const vaga = await vagaService.deleteVaga(id);
				res.status(201).json(vaga);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;