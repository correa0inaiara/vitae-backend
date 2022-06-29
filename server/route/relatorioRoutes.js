const express = require('express');
const router = express.Router();
const relatorioService = require('../service/relatorioService');
const { isAutenticated } = require('../utils/utils');

router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const vagas = await relatorioService.getRelatorios();
				res.status(200).json(vagas);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});


module.exports = router;