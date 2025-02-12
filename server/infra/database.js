const { Pool, Client } = require('pg')
require('dotenv/config');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: false
})
pool.connect()

const client = new Client({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DATABASE,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
	ssl: {
		rejectUnauthorized: false
	}
})
// client.connect()

module.exports = {
	query: (text, params, callback) => {
	  try {
		const query = pool.query(text, params, callback)
		// console.log('mode', process.env.NODE_ENV)
		return query;
	  } catch (error) {
		  return error;
	  }
	},
}