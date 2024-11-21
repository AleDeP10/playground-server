import knexInstance from '../config/knexfile.js';

const addKnexToReq = (req, res, next) => {
  req.db = knexInstance;
  console.log('Knex instance added to request:', req.db !== undefined);
  next();
};

export default addKnexToReq;