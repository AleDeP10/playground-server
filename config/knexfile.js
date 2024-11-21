import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const knexInstance = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
    ssl: process.env.DB_SSL === 'true' ? 
      { rejectUnauthorized: false } : 
      false
  }
});

export default knexInstance;