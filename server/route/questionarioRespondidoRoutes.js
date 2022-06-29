const express = require('express');
const router = express.Router();
const questionarioRespondidoService = require('../service/questionarioRespondidoService');
const { isAutenticated } = require('../utils/utils');

router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const questionariosRespondidos = await questionarioRespondidoService.getQuestionariosRespondidos();
				res.status(200).json(questionariosRespondidos);
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
				const questionarioRespondido = await questionarioRespondidoService.getQuestionarioRespondido(id);
				res.status(200).json(questionarioRespondido);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.post('/:id', async function (req, res, next) {
	try {
		const id = req.params.id;
		const candidatoId = req.query.candidatoId;
		const questionarioRespondido = await questionarioRespondidoService.saveQuestionarioRespondido(id, candidatoId);
		res.status(201).json(questionarioRespondido);
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
				const candidatoId = req.query.candidatoId;
				const questionarioId = req.query.questionarioId;
				const questionarioRespondido = await questionarioRespondidoService.updateQuestionarioRespondido(id, questionarioId, candidatoId);
				res.status(200).json(questionarioRespondido);
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
				const questionarioRespondido = await questionarioRespondidoService.deleteQuestionarioRespondido(id);
				res.status(201).json(questionarioRespondido);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;