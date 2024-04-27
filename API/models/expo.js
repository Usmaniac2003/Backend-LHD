const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const expo = mongoose.Schema({
	expoName: {
		required: true,
		type: String,
	},
	expoDate: {
		required: true,
		type: String,
	},
	expoDetails: {
		required: true,
		type: String,
	},
	expoLink: {
		required: true,
		type: String,
	},
	expoStatus: {
		type: String,
	},
	image: {
		type: String,
	},
	images: {
		type: [String],
	},
});
expo.plugin(uniqueValidator);
module.exports = mongoose.model('expo', expo);
