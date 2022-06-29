const jwt = require('jsonwebtoken')

exports.loginMiddleware = function (req, res, next) {
	try {
		const token = req.params.token;
		const decode = jwt.verify(token, process.env.JWT_KEY);
		req.usuario = decode;
		next();
	} catch (error) {
		return res.status(401).send({message: 'Acesso não autorizado. Faça login antes de continuar.'});
	}
}