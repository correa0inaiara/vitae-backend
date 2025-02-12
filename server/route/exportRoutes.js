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

				if (tableName || recursoId) {
					const result = await exportService.getCSVFile(recursoId, tableName);
				
					if (result.data.length > 0) {
						const path = "../csv/" + result.filename
					
						res.header('Content-Type', 'text/csv')
						res.attachment(path);
						res.status(200).send(result.data)
					} else res.status(404).json({message: result}); 
				} else res.status(404).json({message: "É necessário informar o parâmetro TableName"});
			} else res.status(401).json({message: 'Falha na autenticação.'});
		} else  res.status(401).json({message: 'Usuário não pode ser autenticado.'});
	} catch (error) {
		next(error)
	}
});

module.exports = router;