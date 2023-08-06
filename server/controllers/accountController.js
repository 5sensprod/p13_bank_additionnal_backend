const accountService = require('../services/accountService');

module.exports.getAllAccounts = async (req, res) => {
    let response = {};

    try {
        const userId = req.params.userId;
        const accounts = await accountService.getAccountsByUserId(userId);
        
        response.status = 200;
        response.message = 'Successfully retrieved accounts';
        response.body = accounts;
    } catch (error) {
        console.error('Error in accountController.js', error);
        response.status = 400;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};


module.exports.getAccount = async (req, res) => {
    let response = {};

    try {
        const accountId = req.params.accountId;
        const account = await accountService.getAccountsById(accountId);
        
        if(account) {
            response.status = 200;
            response.message = 'Successfully retrieved account';
            response.body = account;
        } else {
            response.status = 404;
            response.message = 'Account not found';
        }
    } catch (error) {
        console.error('Error in getAccount', error);
        response.status = 500;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};

module.exports.createAccount = async (req, res) => {
    let response = {};

    try {
        const userId = req.params.userId;
        const accountData = { ...req.body, user: userId };
        const newAccount = await accountService.createAccount(accountData);
        
        response.status = 201;
        response.message = 'Successfully created account';
        response.body = newAccount;
    } catch (error) {
        console.error('Error in createAccount', error);
        response.status = 400;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};

// module.exports.updateAccount = async (req, res) => {
//     let response = {};

//     try {
//         const accountId = req.params.accountId;
//         const updatedAccount = await accountService.updateAccount(accountId, req.body);
        
//         if(updatedAccount) {
//             response.status = 200;
//             response.message = 'Successfully updated account';
//             response.body = updatedAccount;
//         } else {
//             response.status = 404;
//             response.message = 'Account not found';
//         }
//     } catch (error) {
//         console.error('Error in updateAccount', error);
//         response.status = 500;
//         response.message = error.message;
//     }

//     return res.status(response.status).send(response);
// };

module.exports.deleteAccount = async (req, res) => {
    let response = {};

    try {
        const accountId = req.params.accountId;
        const result = await accountService.deleteAccount(accountId);
        
        if(result) {
            response.status = 200;
            response.message = 'Successfully deleted account';
        } else {
            response.status = 404;
            response.message = 'Account not found';
        }
    } catch (error) {
        console.error('Error in deleteAccount', error);
        response.status = 500;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};

module.exports.createBulkAccounts = async (req, res) => {
    let response = {};

    try {
        const userId = req.params.userId;
        const accountsData = req.body.accounts;
        const createdAccounts = [];

        for (let accountData of accountsData) {
            accountData.user = userId;
            const newAccount = await accountService.createAccount(accountData);
            createdAccounts.push(newAccount);
        }

        response.status = 201;
        response.message = 'Successfully created accounts';
        response.body = createdAccounts;
    } catch (error) {
        console.error('Error in createBulkAccounts', error);
        response.status = 400;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};