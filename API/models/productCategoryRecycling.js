const mongoose = require('mongoose');

const productCategoryRecycling = mongoose.Schema({
	category: {
		type: String,
		enum: ['selling', 'recycling'],
		
	},
	categoryTitle: {
		type: String,
		required: true,
	},
	adminMinimumCommision: {
		type: Number,
		// required: true
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
	},
	productsubcategoryrecycling: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productsubcategoryrecycling',
        // required: true
    },
});

module.exports = mongoose.model('productcategoriesrecycling', productCategoryRecycling);
