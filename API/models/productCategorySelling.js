const mongoose = require('mongoose');

const productCategory = mongoose.Schema({
	//_id:mongoose.Schema.Types.ObjectId,
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
		required: true
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
	},
	productsubcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productsubcategoryselling',
        // required: true
    },
	
});

module.exports = mongoose.model('productcategoriesselling', productCategory);
