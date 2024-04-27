const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const brandSchema = mongoose.Schema({
	// _id:mongoose.Schema.Types.ObjectId,

	brandLink: {
		type: String,
		required: true,
	},
	brandImage: {
		type: String,
		// required: true,
	},
	status: {
		type: String,
		required: true,
	},
});

brandSchema.plugin(uniqueValidator);
module.exports = mongoose.model('brand', brandSchema);
