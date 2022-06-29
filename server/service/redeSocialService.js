const redeSocialData = require('../data/redeSocialData');

exports.getRedesSociais = async function () {
	return await redeSocialData.getRedesSociais();
}

exports.getRedeSocial = async function (id) {
	return await redeSocialData.getRedeSocial(id);
}

exports.saveRedeSocial = async function (id, redesSociais) {
	let redeSocialResponse = '';
	let redesSociaisResponse = [];
	for (const redeSocial of redesSociais) {
		redeSocialResponse = await redeSocialData.saveRedeSocial(id, redeSocial);
		redesSociaisResponse.push(redeSocialResponse[0]);
	}
	return redesSociaisResponse;
}

exports.updateRedeSocial = async function (id, redeSocial) {
	return await redeSocialData.updateRedeSocial(id, redeSocial);
}

exports.deleteRedeSocial = async function (id) {
	return await redeSocialData.deleteRedeSocial(id);
}