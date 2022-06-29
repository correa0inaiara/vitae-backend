const express = require('express');
const router = express.Router();
const contatoService = require('../service/contatoService');
const { isAutenticated } = require('../utils/utils');


router.get('/', async function (req, res, next) {
	try {
		if (req.headers.token) {
			const decode = isAutenticated(req.headers.token)
			if (decode) {
				const contatos = await contatoService.getContatos();
				res.status(200).json(contatos);
			} else throw new Error('Falha na autenticação.');
		} else throw new Error('Usuário não pode ser autenticado.')
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
				const contato = await contatoService.getContato(id);
				res.status(200).json(contato);
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
		const contato = await contatoService.saveContato(id, body);
		res.status(201).json(contato);
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
				const contato = await contatoService.updateContato(id, body);
				res.status(200).json(contato);
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
				const contato = await contatoService.deleteContato(id);
				res.status(201).json(contato);
			} else throw new Error('Falha na autenticação.');
		} else throw new Error('Usuário não pode ser autenticado.')
	} catch (error) {
		next(error)
	}
});

module.exports = router;