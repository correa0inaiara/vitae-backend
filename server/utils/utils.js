const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fastcsv = require("fast-csv");
const fs = require("fs");

exports.readCSV = async function (filename) {
	let data = ''
	return new Promise((resolve, reject) => {
		fs.createReadStream(filename)
			.pipe(fastcsv.parse({headers: true}))
			.on('error', error => console.error(error))
			.on('data', row => {
				data = row
			})
			.on('finish', () => {
				resolve(data)	
			});
	})
}

exports.exportToCSV = async function (tableName, filename, dataToCsv) {

	const ws = fs.createWriteStream(filename);

	const parseJson = JSON.parse(JSON.stringify(dataToCsv))
	return new Promise((resolve, reject) => {
		fastcsv
		.write(parseJson, {headers: true})
		.pipe(ws)
		.on("finish", async function (res) {
			const read = await exports.readCSV(filename)
			resolve(read)
		})
	})

	// fastcsv
	// 	.write(parseJson, {headers: true})
	// 	.pipe(ws)
	// 	.on("finish", function (res) {
	// 		console.log(`Postgres table ${tableName} exported to CSV file successfully.`);
	// 	})
	
}

exports.mapFields = function (id, idField, array, tableName) {
	let i = 0;
	var size = Object.keys(array).length;
	let text = ''
	let fullText = '';
	let textPrefix = `update ${tableName} set `
	let textSufix = ` where ${idField} = $1 returning *`
	let values = [id]
	for (const entry of Object.entries(array)) {
		i++;
		if (size == i) {
			text = `${entry[0]} = $${i+1}`
			fullText = textPrefix + text + textSufix
		} else {
			text = `${entry[0]} = $${i+1}, `
			textPrefix += text
		}
		values.push(entry[1])
	}
	return [fullText, values];
}

exports.checkType = function (data, types) {
	
	if (!data || typeof data !== 'str') return false;
	let i = 0;
	for (const type of Object.entries(types)) {
		i++;
		if (data.toUpperCase() === type[i]) return true;
	}
	return false;
}

exports.formatDateToDB = function (date) {
	const [day, month, year] = date.split('/');
	const dateDB = month + '/' + day + '/' + year;
	return dateDB;
}

exports.formatDateTimeToDisplay = function (date) {
	const formated = date.toLocaleString()
	return formated;
}

exports.formatDateToDisplay = function (date) {
	const [month, day, year] = date.split('-');
	const dateToDisplay = day + '-' + month + '-' + year;
	return dateToDisplay;
}

exports.handleDates = function (date) {
	if (date) {
		const newDate = date;
		date = exports.formatDateToDB(newDate);
	}
	return date;
}

exports.generateHashPassword =  async function (password) {
	const saltRounds = 10;
	const hash = await bcrypt.hash(password, saltRounds);
	password = hash;
	return password;
}

exports.isAutenticated = function (token) {
	try {
		const decode = jwt.verify(token, process.env.JWT_KEY);
		return decode;
	} catch (error) {
		throw new Error('Falha na autenticação: Token Inválido')
	}
}