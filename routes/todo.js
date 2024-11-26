import express from 'express'; 
import addKnexToReq from '../middleware/dbMiddleware.js'; 
import todoListController from '../controllers/todoList.js'; 
import { authenticateTokenHttp } from '../middleware/httpAuthMiddleware.js';

const router = express.Router();

router.post('/crea', [addKnexToReq, /*authenticateTokenHttp, */], todoListController.crea);
router.post('/ricerca', [addKnexToReq, /*authenticateTokenHttp, */], todoListController.ricerca);
router.put('/aggiorna', [addKnexToReq, /*authenticateTokenHttp, */], todoListController.aggiorna);
router.delete('/cancella', [addKnexToReq, /*authenticateTokenHttp, */], todoListController.cancella);

export default router;
