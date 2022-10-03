import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const connection = new Pool({
	connectionString: process.env.DATABASE_URL,
	// user: 'postgres',
	// password: '1212',
	// host: 'localhost',
	// port: 5432,
	// database: 'boardcamp'
	
});

export { connection };