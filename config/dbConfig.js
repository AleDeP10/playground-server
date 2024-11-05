const { Pool } = require('pg');

let pool; 
if (process.env.DB_HOSTNAME === "localhost") {

  pool = new Pool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 5432,
  });

} else {

  pool = new Pool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: true, // Ignora l'errore "SSL/TLS required"
    },
  });

}

module.exports = pool;



