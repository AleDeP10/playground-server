import express from "express";

import { addDbToReq } from "../config/dbConfig.js";
import hello from "../controllers/hello.js";
import fetchData from "../controllers/fetchData.js";
import dbScan from "../controllers/dbScan.js";
import login from "../controllers/login.js";

import { authenticateTokenHttp } from "../middleware/httpAuthMiddleware.js";

const router = express.Router();

router.get('/hello', hello);
router.get('/fetchData', fetchData);
router.get('/dbScan', addDbToReq, dbScan);
router.post('/login', login);

export default router;