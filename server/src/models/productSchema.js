const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product_name:{
        type: String
    },
    product_price:{
        type: Number
    },
    stock:{
        type: Number
    }
});

const product = mongoose.model('product', productSchema);
module.exports = product;