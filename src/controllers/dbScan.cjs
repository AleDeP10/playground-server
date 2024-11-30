const { pool } = require('../config/dbConfig.cjs');

const dbScan = async (req, res) => {
  let query = 'SELECT 1';
  let alias = 'result';
  let result = null;
  let body;
  if (req.query.query) {
    query = req.query.query;
  }
  if (req.query.alias) {
    alias = req.query.alias;
  }
  
  try {
    result = await new Promise((resolve, reject) => {
      pool.query(
        `${query} AS ${alias}`, 
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
    if (result.rows?.length > 0) {
      body = { [alias]: result.rows[0][alias] }
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }

  if (body) {
    res.status(200).json(body);
    console.log('dbScan.controller', { req: req.query, body });
  } else {
    res.status(500);
  }
  return body;
};

module.exports = { dbScan };