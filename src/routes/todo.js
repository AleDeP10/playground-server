import express from "express"; 
import addKnexToReq from "../middleware/dbMiddleware.js"; 
import { create, search, update, remove } from "../controllers/todoList.js"; 
import { authenticateTokenHttp } from "../middleware/httpAuthMiddleware.js";
const router = express.Router();
console.log({ create, search, update, remove })
router.post('/create', [addKnexToReq, authenticateTokenHttp], create);
router.post('/search', [addKnexToReq, authenticateTokenHttp], search);
router.put('/update', [addKnexToReq, authenticateTokenHttp], update);
router.delete('/remove', [addKnexToReq, authenticateTokenHttp], remove);

export default router;
