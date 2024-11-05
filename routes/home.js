import express from 'express';
const router = express.Router();

import { hello as helloController } from '../controllers/hello.js';
import { authenticateTokenHttp } from '../middleware/httpAuthMiddleware.js';

router.post('/hello', /*authenticateTokenHttp, */helloController);

export default router;