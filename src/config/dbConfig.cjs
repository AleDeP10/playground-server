
const pkg = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === 'true' ?
    { rejectUnauthorized: false } :
    false
});

const addDbToReq = (req, res, next) => {
  req.db = pool;
  console.log('DB Pool added to request:', req.db !== undefined);
  next();
};

module.exports = { pool, addDbToReq }