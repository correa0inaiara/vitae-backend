const express = require('express');
const router = express.Router();
const beneficioOferecidoService = require('../service/beneficioOferecidoService');
const { isAutenticated } = require('../utils/utils');

router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const beneficiosOferecidos = await beneficioOferecidoService.getBeneficiosOferecidos();
				res.status(200).json(beneficiosOferecidos);
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
				const beneficioOferecido = await beneficioOferecidoService.getBeneficioOferecido(id);
				res.status(200).json(beneficioOferecido);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

router.post('/:id', async function (req, res, next) {
	try {
		const id = req.params.id;
		const beneficioId = req.query.beneficioId;
		const beneficioOferecido = await beneficioOferecidoService.saveBeneficioOferecido(id, beneficioId);
		res.status(201).json(beneficioOferecido);
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
				const beneficioOferecido = await beneficioOferecidoService.updateBeneficioOferecido(id, body);
				res.status(200).json(beneficioOferecido);
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
				const beneficioOferecido = await beneficioOferecidoService.deleteBeneficioOferecido(id);
				res.status(201).json(beneficioOferecido);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;