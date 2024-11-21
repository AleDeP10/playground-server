import express from 'express';

import { addDbToReq } from '../config/dbConfig.js';
import helloController from '../controllers/hello.js';
import fetchDataController from '../controllers/fetchData.js';
import dbScanController from '../controllers/dbScan.js';
import { authenticateTokenHttp } from '../middleware/httpAuthMiddleware.js';

const router = express.Router();

router.get('/hello', /*authenticateTokenHttp, */helloController.hello);
router.get('/fetch_data', /*authenticateTokenHttp, */fetchDataController.fetchData);
router.get('/db_scan', addDbToReq, /*authenticateTokenHttp, */dbScanController.dbScan);

export default router;