const express = require('express');
const router = express.Router();
const loginService = require('../service/loginService');
const { isAutenticated } = require('../utils/utils');

router.post('/', async function (req, res, next) {
	try {
		const body = req.body;
		const login = await loginService.login(body);
		res.status(200).json(login);
	} catch (error) {
		next(error)
	}
});

module.exports = router;