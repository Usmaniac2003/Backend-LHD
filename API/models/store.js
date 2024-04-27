const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password:
    {
        type: String,
        required: true,
        minLength: 8
    },
    contactNumber:
    {
        type: Number,
        required: true
    },
    brandName:
    {
        type: String,
        required: true
    },
    city:
    {
        type: String,
        required: true
    },
    country:
    {
        type: String,
        required: true
    },
    productCategories:
    {
        type: String,
        required: true
    },
    qualityController: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qualityController'
    },
    image:
    {
        type: String
    }
});

module.exports = mongoose.model('store', storeSchema);
