import express from 'express';
const router = express.Router();

import { hello as helloController } from '../controllers/hello.js';
import { fetchData as fetchDataController } from '../controllers/fetchData.js';
import { ricerca as todoListController } from '../controllers/todoList.js';
import { authenticateTokenHttp } from '../middleware/httpAuthMiddleware.js';

router.post('/hello', /*authenticateTokenHttp, */helloController);
router.post('/fetchData', /*authenticateTokenHttp, */fetchDataController);
router.post('/todo_list/ricerca', /*authenticateTokenHttp, */todoListController);

export default router;