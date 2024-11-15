import pool from '../config/dbConfig.js'

export const dbScan = async (req, res) => {
  let query = 'SELECT 1';
  let alias = 'result';
  let result = null;
  let body;
  if (req.body.query) {
    query = req.body.query;
  }
  if (req.body.alias) {
    alias = req.body.alias;
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
    body = { [alias ? alias : 'result']: result.rows[0].result }
    console.log('dbScan.controller', { req: req.body, result, rows: result.rows, body });
  } catch (error) {
    console.log('Error fetching data:', error.message);
    throw error;
  }

  if (result.rows?.length > 0) {
    res.status(200).json(body);
  } else {
    res.status(200);
  }
  return body;
};