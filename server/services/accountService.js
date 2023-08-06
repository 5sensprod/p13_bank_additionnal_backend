const Account = require('../database/models/accountModel');

module.exports.createAccount = async serviceData => {
  try {
    const account = new Account({
      user: serviceData.user,
      title: serviceData.title,
      balance: serviceData.balance,
      description: serviceData.description
    });

    return await account.save();
  } catch (error) {
    console.error('Error in accountService.js: createAccount', error);
    throw new Error(error);
  }
};

module.exports.getAccountsById = async accountId => {
    try {
        return await Account.findById(accountId);
    } catch (error) {
        console.error('Error in accountService.js: getAccountById', error);
        throw new Error(error);
    }
};

module.exports.getAccountsByUserId = async userId => {
    try {
        return await Account.find({ user: userId });
    } catch (error) {
        console.error('Error in accountService.js: getAccountsByUserId', error);
        throw new Error(error);
    }
};

// module.exports.updateAccount = async (accountId, updateData) => {
//   try {
//     return await Account.findByIdAndUpdate(accountId, updateData, { new: true });
//   } catch (error) {
//     console.error('Error in accountService.js: updateAccount', error);
//     throw new Error(error);
//   }
// };

module.exports.deleteAccount = async accountId => {
  try {
    const result = await Account.findByIdAndDelete(accountId);
    return result ? true : false;
  } catch (error) {
    console.error('Error in accountService.js: deleteAccount', error);
    throw new Error(error);
  }
};
