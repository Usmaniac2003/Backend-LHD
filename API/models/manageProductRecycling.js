const mongoose = require('mongoose');

const manageProduct = mongoose.Schema({
    ambassadorId:{
        type: Number,
        required: true

    },
    category:{
        type: String,
        required: true

    },
    seller:{
        type: String,
        required: true

    },
    quantity:{
        type: Number,
        required: true

    },
    price:
    {
        type: Number,
        required:true
    },
    status:
    {
        type: String,
        enum:['active','inactive']
    },
    image:
    {
        type: String,
        required:true
    }
   
});

module.exports = mongoose.model('productrecycling',  manageProduct);
