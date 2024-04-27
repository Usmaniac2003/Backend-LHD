const mongoose = require('mongoose');

const sellingSchema = mongoose.Schema({
	sellingType: {
		type: String,
		enum: ['B2B', 'B2C', 'Both'],
		// required: true
	},
	productName: {
		type: String,
		// required: true
	},
	productType: {
		type: String,
		// required: true
	},
	category: {
		type: String,
		// required: true
	},
	subcategory: {
		type: String,
		// required: true
	},
	madeCountry: {
		type: String,
		// required: true
	},
	ownerType: {
		type: String,
		enum: ['Manufacturer', 'Producer', 'Whole Seller', 'Seller'],
	},
	hsCode: {
		type: Number,
		// required: true
	},

	productPrice: {
		type: Number,
		// required: true
	},
	adminCommision: {
		type: Number,
		// required: true
	},
	admassadorCommision: {
		type: Number,
		// required: true
	},
	subAdmassadorCommision: {
		type: Number,
		// required: true
	},
	referralCommision: {
		type: Number,
		// required: true
	},
	retailPrice: {
		type: Number,
		// required: true
	},
	productQuantity: {
		type: Number,
		// required: true
	},
	unit: {
		type: String,
		enum: ['Piece', 'Meter', 'KiloGram', 'Litre'],
		// required: true
	},
	qualityOfProduct: {
		type: String,
		// required: true
	},
	delivery: [
		{
			check: String,
			cod: String,
			charges: Number,
		},
	],
	deliveryTime: {
		type: String,
		// required: true
	},
	productDetails: {
		type: String,
		// required: true,
	},
	manufacturingDate: {
		type: String,
		// required: true
	},
	expireDate: {
		type: String,
		// required: true
	},
	productProductionTime: [
		{
			d: String,
			w: String,
			m: Number,
		},
	],

	productcategory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'productcategoriesselling',
		// required: true
	},
	image: {
		type: String,
	},
	images: {
		type: [String],
	},
	sellerID:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'seller'
	},
	status: {
		type: String,
		default: 'pending',
	},
});

module.exports = mongoose.model('productsellingform', sellingSchema);
