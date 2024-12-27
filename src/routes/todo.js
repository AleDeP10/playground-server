import express from "express"; 
import addKnexToReq from "../middleware/dbMiddleware.js"; 
import { crea, ricerca, aggiorna, cancella } from "../controllers/todoList.js"; 
import { authenticateTokenHttp } from "../middleware/httpAuthMiddleware.js";
const router = express.Router();
console.log({ crea, ricerca, aggiorna, cancella })
router.post('/crea', [addKnexToReq, authenticateTokenHttp], crea);
router.post('/ricerca', [addKnexToReq, authenticateTokenHttp], ricerca);
router.put('/aggiorna', [addKnexToReq, authenticateTokenHttp], aggiorna);
router.delete('/cancella', [addKnexToReq, authenticateTokenHttp], cancella);

export default router;
