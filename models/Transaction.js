const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    menu: [{
        menu_id: {
            type: String,
        },
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        amount: {
            type: Number,
        },
    }],
    total: {
        type: Number,
    },
    lat: {
        type: Number,
    },
    long: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('transaction', TransactionSchema);