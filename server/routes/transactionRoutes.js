const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const tokenValidation = require('../middleware/tokenValidation');

router.get('/account/:accountId/transactions', tokenValidation.validateToken, transactionController.getTransactions);
router.post('/account/:accountId/transactions', tokenValidation.validateToken, transactionController.createTransaction);
router.delete('/account/:accountId/transactions/:transactionId', tokenValidation.validateToken, transactionController.deleteTransaction);
router.put('/account/:accountId/transactions/:transactionId', tokenValidation.validateToken, transactionController.updateExistingTransaction);
router.post('/account/:accountId/bulk-transactions', tokenValidation.validateToken, transactionController.createBulkTransactions);

module.exports = router;