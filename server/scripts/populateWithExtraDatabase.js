const mongoose = require('mongoose');
const User = require('../database/models/userModel');
const Account = require('../database/models/accountModel');
const Transaction = require('../database/models/transactionModel');
const fs = require('fs');
const path = require('path');

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/argentBankExtraDB';
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

async function genericPopulate(Model, filePath, transformFn = data => data) {
    const dataFromFile = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
    const items = JSON.parse(dataFromFile);
    items.forEach(transformFn);

    for (let item of items) {
        let existingItem = await Model.findById(item._id);
        if (!existingItem) {
            try {
                await Model.create(item);
                console.log(`Élément ${item._id} ajouté avec succès au modèle ${Model.modelName}!`);
            } catch (error) {
                console.error(`Erreur lors de l'ajout de l'élément ${item._id} au modèle ${Model.modelName}:`, error);
            }
        } else {
            console.log(`Élément ${item._id} pour le modèle ${Model.modelName} existe déjà.`);
        }
    }
}

async function main() {
    await genericPopulate(User, 'users.json');
    
    await genericPopulate(Account, 'accounts.json', account => {
        account._id = mongoose.Types.ObjectId(account._id);
        account.user = mongoose.Types.ObjectId(account.user);
    });

    await genericPopulate(Transaction, 'transactions.json', transaction => {
        transaction.user = mongoose.Types.ObjectId(transaction.user);
        transaction.account = mongoose.Types.ObjectId(transaction.account);
    });

    await mongoose.disconnect();
    console.log("Peuplement terminé !");
}

main();
