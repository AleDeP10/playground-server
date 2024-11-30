const express = require('express');

const { addDbToReq } = require('../config/dbConfig.cjs');
const helloController = require('../controllers/hello.cjs');
const fetchDataController = require('../controllers/fetchData.cjs');
const dbScanController = require('../controllers/dbScan.cjs');
const { authenticateTokenHttp } = require('../middleware/httpAuthMiddleware.cjs');

const router = express.Router();

router.get('/hello', /*authenticateTokenHttp, */helloController.hello);
router.get('/fetch_data', /*authenticateTokenHttp, */fetchDataController.fetchData);
router.get('/db_scan', addDbToReq, /*authenticateTokenHttp, */dbScanController.dbScan);

module.exports = router;