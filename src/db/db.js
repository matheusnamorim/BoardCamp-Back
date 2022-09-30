import pkg from 'pg';

const { Pool } = pkg;

const connection = new Pool({
	user: 'postgres',
	password: '1212',
	host: 'localhost',
	port: 5432,
	database: 'boardcamp'
});

export { connection };