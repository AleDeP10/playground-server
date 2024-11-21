import express from 'express'; 
import addKnexToReq from '../middleware/dbMiddleware.js'; 
import todoListController from '../controllers/todoList.js'; 
import { authenticateTokenHttp } from '../middleware/httpAuthMiddleware.js';

const router = express.Router();

router.post('/ricerca', [addKnexToReq, /*authenticateTokenHttp, */], todoListController.ricerca);

export default router;
