const Transaction = require('../database/models/transactionModel');

module.exports.createTransaction = async serviceData => {
  try {
    const transaction = new Transaction({
        account: serviceData.account,
        amount: serviceData.amount,
        description: serviceData.description,
        category: serviceData.category,
        transactionType: serviceData.transactionType,
        balance: serviceData.balance,
    });

    return await transaction.save();
  } catch (error) {
    console.error('Error in transactionService.js: createTransaction', error);
    throw new Error(error);
  }
};

module.exports.getTransactionsByAccountId = async accountId => {
  try {
    return await Transaction.find({ account: accountId });
  } catch (error) {
    console.error('Error in transactionService.js: getTransactionsByAccountId', error);
    throw new Error(error);
  }
};

module.exports.deleteTransaction = async transactionId => {
  try {
    const result = await Transaction.findByIdAndDelete(transactionId);
    return result ? true : false;
  } catch (error) {
    console.error('Error in transactionService.js: deleteTransaction', error);
    throw new Error(error);
  }
};

module.exports.createBulkTransactions = async transactions => {
    try {
        return await Transaction.insertMany(transactions);
    } catch (error) {
        console.error('Error in transactionService.js: createBulkTransactions', error);
        throw new Error(error);
    }
};

module.exports.updateTransaction = async (transactionId, updatedData) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(transactionId, updatedData, { new: true });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return transaction;
  } catch (error) {
    console.error('Error in transactionService.js: updateTransaction', error);
    throw new Error(error);
  }
};