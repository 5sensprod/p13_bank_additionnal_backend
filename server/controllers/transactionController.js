const transactionService = require('../services/transactionService');

module.exports.getTransactions = async (req, res) => {
    let response = {};

    try {
        const accountId = req.params.accountId;
        const transactions = await transactionService.getTransactionsByAccountId(accountId);
        
        response.status = 200;
        response.message = 'Successfully retrieved transactions';
        response.body = transactions;
    } catch (error) {
        console.error('Error in transactionController.js', error);
        response.status = 400;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};

module.exports.createTransaction = async (req, res) => {
    let response = {};

    try {
        const accountId = req.params.accountId;
        const transactionData = { ...req.body, account: accountId }; // Ajouter l'accountId au body
        const newTransaction = await transactionService.createTransaction(transactionData);
        
        response.status = 201;
        response.message = 'Successfully created transaction';
        response.body = newTransaction;
    } catch (error) {
        console.error('Error in transactionController.js', error);
        response.status = 400;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};

module.exports.deleteTransaction = async (req, res) => {
    let response = {};

    try {
        const transactionId = req.params.transactionId;
        const result = await transactionService.deleteTransaction(transactionId);
        
        if(result) {
            response.status = 200;
            response.message = 'Transaction deleted successfully';
        } else {
            response.status = 404;
            response.message = 'Transaction not found';
        }
    } catch (error) {
        console.error('Error in deleteTransaction', error);
        response.status = 500;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};

module.exports.createBulkTransactions = async (req, res) => {
    let response = {};

    try {
        const accountId = req.params.accountId;
        const transactionsData = req.body.transactions; 

        // Valide les données entrantes
        if (!transactionsData || !Array.isArray(transactionsData)) {
            throw new Error("Invalid transactions data");
        }

        // Ajoute l'accountId à chaque transaction
        transactionsData.forEach(transaction => transaction.account = accountId);

        const createdTransactions = await transactionService.createBulkTransactions(transactionsData);

        response.status = 201;
        response.message = 'Successfully added transactions in bulk';
        response.body = createdTransactions;
    } catch (error) {
        console.error('Error in createBulkTransactions', error);
        response.status = 400;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};

module.exports.updateExistingTransaction = async (req, res) => {
    let response = {};

    // Ajoutez la validation ici
    const allowedUpdates = ['notes', 'category'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    // La logique de mise à jour existante commence ici
    try {
        const transactionId = req.params.transactionId;
        const updatedData = req.body;

        // Validation des données supplémentaires si nécessaire
        // ...

        const updatedTransaction = await transactionService.updateTransaction(transactionId, updatedData);
        
        response.status = 200;
        response.message = 'Transaction successfully updated';
        response.body = updatedTransaction;
    } catch (error) {
        console.error('Error in updateExistingTransaction', error);
        response.status = 500;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};