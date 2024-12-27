import { knexInstance } from "../config/knexfile.js";

const addKnexToReq = (req, res, next) => {
  req.db = knexInstance; // Assegna direttamente l'istanza knex
  console.log('Knex instance added to request:', typeof req.db);  // Verifica che sia 'object'
  next();
};

export default addKnexToReq;
