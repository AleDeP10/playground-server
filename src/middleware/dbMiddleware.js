import { knexInstance } from "../config/knexfile.js";

const addKnexToReq = (req, res, next) => {
  req.db = knexInstance;
  next();
};

export default addKnexToReq;
