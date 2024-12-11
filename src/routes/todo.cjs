const express = require('express'); 
const addKnexToReq = require('../middleware/dbMiddleware'); 
const { crea, ricerca, aggiorna, cancella } = require('../controllers/todoList'); 
const { authenticateTokenHttp } = require('../middleware/httpAuthMiddleware');
const router = express.Router();
console.log({ crea, ricerca, aggiorna, cancella })
router.post('/crea', [addKnexToReq, /*authenticateTokenHttp, */], crea);
router.post('/ricerca', [addKnexToReq, /*authenticateTokenHttp, */], ricerca);
router.put('/aggiorna', [addKnexToReq, /*authenticateTokenHttp, */], aggiorna);
router.delete('/cancella', [addKnexToReq, /*authenticateTokenHttp, */], cancella);

module.exports = router;
