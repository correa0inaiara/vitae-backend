const express = require('express');
const exportService = require('../service/exportService');
const router = express.Router();
const { isAutenticated } = require('../utils/utils');

router.get('/:id', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const recursoId = req.params.id;
				const tableName = req.query.TableName;
				const result = await exportService.getCSVFile(recursoId, tableName);
				const path = "../csv/" + result.filename
				
				res.header('Content-Type', 'text/csv')
				res.attachment(path);
				res.status(200).send(result.data)
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;