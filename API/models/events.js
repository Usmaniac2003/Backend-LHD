const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	serviceProvider: {
		type: String,
		required: true,
	},
	providerContact: {
		type: Number,
		required: true,
	},
	validityDate: {
		type: String,
		required: true,
	},

	eventDetails: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
});

module.exports = mongoose.model('events', eventSchema);
