const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        enum: ['Electronic', 'Manual', /* autres types de transaction */],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
