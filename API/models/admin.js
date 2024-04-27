const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const adminSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		// unique: true,
		required: 'Email address is required',
		// validate: {
		//   validator: () => Promise.resolve(false),
		//   message: 'Email validation failed'
		// },
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please fill a valid email address',
		],
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
	},
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('admin', adminSchema);
