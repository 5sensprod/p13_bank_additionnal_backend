const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const tokenValidation = require('../middleware/tokenValidation');

// Récupérer tous les comptes d'un utilisateur
router.get('/user/:userId/accounts', tokenValidation.validateToken, accountController.getAllAccounts);

// Récupérer un compte spécifique d'un utilisateur
router.get('/user/:userId/accounts/:accountId', tokenValidation.validateToken, accountController.getAccount);

// Créer un nouveau compte pour un utilisateur
router.post('/user/:userId/accounts', tokenValidation.validateToken, accountController.createAccount);

// Mettre à jour un compte spécifique
// router.put('/user/:userId/accounts/:accountId', tokenValidation.validateToken, accountController.updateAccount);

// Supprimer un compte
router.delete('/user/:userId/accounts/:accountId', tokenValidation.validateToken, accountController.deleteAccount);

// Créer plusieurs comptes pour un utilisateur
router.post('/user/:userId/bulk-accounts', accountController.createBulkAccounts);

module.exports = router;
