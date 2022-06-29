const express = require('express');
const router = express.Router();
const candidaturaService = require('../service/candidaturaService');
const { isAutenticated } = require('../utils/utils');

router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const vagaId = req.params.id;
				const candidaturas = await candidaturaService.getCandidaturas(vagaId);
				res.status(200).json(candidaturas);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.get('/vaga/:id', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const vagaId = req.params.id;
				const candidaturas = await candidaturaService.getCandidaturasByVaga(vagaId);
				res.status(200).json(candidaturas);
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
				const vagaId = req.params.id;
				const candidaturas = await candidaturaService.getCandidaturaById(vagaId);
				res.status(200).json(candidaturas);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.get('/candidato/:id', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const id = req.params.id;
				const candidatura = await candidaturaService.getCandidaturaByCandidato(id);
				res.status(200).json(candidatura);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.post('/', async function (req, res, next) {
	try {
		const candidatoId = req.query.candidatoId;
		const vagaId = req.query.vagaId;
		const curriculoId = req.query.curriculoId;
		const candidatura = await candidaturaService.saveCandidatura(candidatoId, curriculoId, vagaId);
		res.status(201).json(candidatura);
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
				const vagaId = req.body;
				const candidatura = await candidaturaService.updateCandidatura(id, vagaId);
				res.status(200).json(candidatura);
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
				const candidatura = await candidaturaService.deleteCandidatura(id);
				res.status(201).json(candidatura);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;