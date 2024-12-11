const express = require('express');

const { addDbToReq } = require('../config/dbConfig');
const helloController = require('../controllers/hello');
const fetchDataController = require('../controllers/fetchData');
const dbScanController = require('../controllers/dbScan');
const { authenticateTokenHttp } = require('../middleware/httpAuthMiddleware');

const router = express.Router();

router.get('/hello', /*authenticateTokenHttp, */helloController.hello);
router.get('/fetch_data', /*authenticateTokenHttp, */fetchDataController.fetchData);
router.get('/db_scan', addDbToReq, /*authenticateTokenHttp, */dbScanController.dbScan);

module.exports = router;