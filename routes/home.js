import express from 'express';
const router = express.Router();

import { hello as helloController } from '../controllers/hello.js';
import { fetchData as fetchDataController } from '../controllers/fetchData.js';
import { authenticateTokenHttp } from '../middleware/httpAuthMiddleware.js';

router.post('/hello', /*authenticateTokenHttp, */helloController);
router.post('/fetchData', /*authenticateTokenHttp, */fetchDataController);

export default router;