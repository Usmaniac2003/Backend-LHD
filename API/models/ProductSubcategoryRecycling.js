const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
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

module.exports = mongoose.model('productsubcategoryrecycling', subCategorySchema);
