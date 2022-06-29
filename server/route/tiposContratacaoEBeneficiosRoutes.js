const express = require('express');
const router = express.Router();
const tiposContratacaoEBeneficiosService = require('../service/tiposContratacaoEBeneficiosService');
const { isAutenticated } = require('../utils/utils');

router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const tiposContratacaoEBeneficios = await tiposContratacaoEBeneficiosService.getTiposContratacaoEBeneficiosService();
				res.status(200).json(tiposContratacaoEBeneficios);
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;