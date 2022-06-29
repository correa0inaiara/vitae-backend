const { Pool, Client } = require('pg')
require('dotenv/config');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: {
	  rejectUnauthorized: false
  }
})

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
client.connect()

module.exports = {
	query: (text, params, callback) => {
	  try {
		const query = client.query(text, params, callback)
		return query;
	  } catch (error) {
		  return error;
	  }
	},
}