const empresaData = require('../data/empresaData');

exports.getEmpresas = async function () {
	return await empresaData.getEmpresas();
}

exports.getEmpresa = async function (id) {
	return await empresaData.getEmpresa(id);
}

exports.saveEmpresa = async function (id, empresa) {
	const user = await empresaData.getEmpresa(id);
	if (user.length == 1) throw new Error('Não pode existir múltiplas empresas para um mesmo usuário.');
	
	const existingCNPJ = await empresaData.getEmpresaByCNPJ(empresa.cnpj);
	if (existingCNPJ.length > 0) throw new Error('Esse CNPJ já foi cadastrado.');
	
	return await empresaData.saveEmpresa(id, empresa);
}

exports.updateEmpresa = async function (id, empresa) {
	return await empresaData.updateEmpresa(id, empresa);
}

exports.deleteEmpresa = async function (id) {
	return await empresaData.deleteEmpresa(id);
}