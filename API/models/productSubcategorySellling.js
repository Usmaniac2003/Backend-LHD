const mongoose = require('mongoose');

const subCategorySellingSchema = mongoose.Schema({
    categoryType: {
        type: String,
        enum:['selling','recycling'],
        //required: true
    },
    category: {
        type: String
    },
    subCategoryTitle: {
        type: String,
        required: true
    },
   
});

module.exports = mongoose.model('productsubcategoryselling',subCategorySellingSchema );
