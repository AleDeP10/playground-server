// db.js
//const db = require('../config/knexfile'); // Importa la configurazione di Knex.js
import db from '../config/knexfile.js';

// Middleware per aggiungere knex all'oggetto req
const knexMiddleware = (req, res, next) => {
  req.db = db; // Aggiunge la connessione knex all'oggetto req
  next();
};

//module.exports = knexMiddleware;
export default knexMiddleware;
