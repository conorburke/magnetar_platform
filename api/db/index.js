module.exports = require('knex')({
	client: 'pg',
	version: '10.0',
	// connection: process.env.DATABASE_URL
	connection: {
		host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
	}
});
