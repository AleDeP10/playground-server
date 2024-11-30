const knexInstance = require('../config/knexfile.cjs');

// const addKnexToReq = (req, res, next) => {
//   req.db = knexInstance;
//   console.log('Knex instance added to request:', typeof req.db);
//   next();
// };

const addKnexToReq = (req, res, next) => {
  req.db = knexInstance;
  console.log('Knex instance added to request:', typeof req.db);  // Verifica che sia 'function'
  next();
};


module.exports = addKnexToReq;