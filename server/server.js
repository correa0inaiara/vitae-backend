const express = require('express');
const app = express();
require('dotenv/config');

const userRoutes = require('./route/userRoutes')
const contatoRoutes = require('./route/contatoRoutes')
const enderecoRoutes = require('./route/enderecoRoutes')
const redeSocialRoutes = require('./route/redeSocialRoutes')
const candidatoRoutes = require('./route/candidatoRoutes')
const empresaRoutes = require('./route/empresaRoutes')
const curriculoRoutes = require('./route/curriculoRoutes')
const educacaoRoutes = require('./route/educacaoRoutes')
const cursoRoutes = require('./route/cursoRoutes')
const idiomaRoutes = require('./route/idiomaRoutes')
const habilidadeRoutes = require('./route/habilidadeRoutes')
const experienciaRoutes = require('./route/experienciaRoutes')
const questionarioRoutes = require('./route/questionarioRoutes')
const questaoRoutes = require('./route/questaoRoutes')
const questaoRespondidaRoutes = require('./route/questionarioRespondidoRoutes')
const vagaRoutes = require('./route/vagaRoutes')
const beneficioOferecidoRoutes = require('./route/beneficioOferecidoRoutes')
const candidaturasRoutes = require('./route/candidaturaRoutes')
const candidatoSelecionadoRoutes = require('./route/candidatoSelecionadoRoutes')
const processoSeletivoRoutes = require('./route/processoSeletivoRoutes')
const agendamentoRoutes = require('./route/agendamentoRoutes')
const loginRoutes = require('./route/loginRoutes')
const relatorioRoutes = require('./route/relatorioRoutes')
const tiposContratacaoEBeneficiosRoutes = require('./route/tiposContratacaoEBeneficiosRoutes')
const questoesRespondidasRoutes = require('./route/questoesRespondidasRoutes')
const exportRoutes = require('./route/exportRoutes')

/**
 * CORS
 */
const origin = 'https://app-sistema-vagas-frontend.herokuapp.com'
// const origin = 'http://localhost:3000'

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
	res.header('Access-Control-Allow-Origin', origin)
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Token')
	next()
})

/**
 * Routes
 */
app.use(express.json());
app.use('/usuarios', userRoutes);
app.use('/login', loginRoutes);
app.use('/contatos', contatoRoutes);
app.use('/enderecos', enderecoRoutes);
app.use('/redessociais', redeSocialRoutes);
app.use('/candidatos', candidatoRoutes);
app.use('/empresas', empresaRoutes);
app.use('/curriculos', curriculoRoutes);
app.use('/educacao', educacaoRoutes);
app.use('/cursos', cursoRoutes);
app.use('/idiomas', idiomaRoutes);
app.use('/habilidades', habilidadeRoutes);
app.use('/experiencias', experienciaRoutes);
app.use('/questionarios', questionarioRoutes);
app.use('/questoes', questaoRoutes);
app.use('/questoesrespondidas', questoesRespondidasRoutes);
app.use('/questionariosrespondidos', questaoRespondidaRoutes);
app.use('/vagas', vagaRoutes);
app.use('/beneficiosoferecidos', beneficioOferecidoRoutes);
app.use('/candidaturas', candidaturasRoutes);
app.use('/candidatosselecionados', candidatoSelecionadoRoutes);
app.use('/processosseletivos', processoSeletivoRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/tiposcontratacaoebeneficios', tiposContratacaoEBeneficiosRoutes);
app.use('/export', exportRoutes);

app.use(function (error, req, res, next) {
	let code = 500;
	switch(error.message) {
		case 'Falha na autentica????o.':
			code = 401
			break;
		case 'Usu??rio n??o pode ser autenticado.':
			code = 401
			break;
		case 'N??o pode existir m??ltiplos candidatos para um mesmo usu??rio.':
			code = 400
			break;
		case 'Esse CPF j?? foi cadastrado.':
			code = 400
			break;
		case 'N??o pode existir m??ltiplas empresas para um mesmo usu??rio.':
			code = 400
			break;
		case 'Esse CNPJ j?? foi cadastrado.':
			code = 400
			break;
		case 'E-mail n??o encontrado.':
			code = 404
			break;
		case 'Erro no servi??o getQuestao':
			code = 500
			break;
		case 'Erro no servi??o getQuestionario':
			code = 500
			break;
		case 'Esse e-mail j?? foi cadastrado, use outro.':
			code = 401
			break;
		case 'Senha inv??lida!':
			code = 401
			break;
		case 'Usu??rio n??o encontrado':
			code = 404
			break;
	}
	res.status(code).send(error.message);
});

app.listen(process.env.PORT || 8000);