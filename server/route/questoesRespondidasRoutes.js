const express = require('express');
const router = express.Router();
const questoesRespondidasService = require('../service/questoesRespondidasService');
const { isAutenticated } = require('../utils/utils');

router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const questoes = await questoesRespondidasService.getQuestoesRespondidas();
				res.status(200).json(questoes);
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
				const questao = await questoesRespondidasService.getQuestaoRespondida(id);
				res.status(200).json(questao);
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
		const questao = await questoesRespondidasService.saveQuestaoRespondida(id, body);
		res.status(201).json(questao);
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
				const questaoRespondida = await questoesRespondidasService.updateQuestaoRespondida(id, body);
				res.status(200).json(questaoRespondida);
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
				const questao = await questoesRespondidasService.deleteQuestaoRespondida(id);
				res.status(201).json(questao);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;