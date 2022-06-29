const express = require('express');
const router = express.Router();
const processoSeletivoService = require('../service/processoSeletivoService');
const { isAutenticated } = require('../utils/utils');

router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const processosSeletivos = await processoSeletivoService.getProcessosSeletivos();
				res.status(200).json(processosSeletivos);
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
				const processoSeletivo = await processoSeletivoService.getProcessoSeletivo(id);
				res.status(200).json(processoSeletivo);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.post('/:id', async function (req, res, next) {
	try {
		const id = req.params.id;
		const vagaId = req.query.vagaId;
		const body = req.body;
		const processoSeletivo = await processoSeletivoService.saveProcessoSeletivo(id, vagaId, body);
		res.status(201).json(processoSeletivo);
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
				const processoSeletivo = await processoSeletivoService.updateProcessoSeletivo(id, body);
				res.status(200).json(processoSeletivo);
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
				const processoSeletivo = await processoSeletivoService.deleteProcessoSeletivo(id);
				res.status(201).json(processoSeletivo);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;