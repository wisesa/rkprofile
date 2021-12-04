const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    type: {
        type: String
    },
    pic: {
        type: String
    }
});

module.exports = Menu = mongoose.model('menu', MenuSchema);