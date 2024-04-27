const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email:
    {
        type: String,
        reuired:true
    },
    sellerBio:
    {
        type: String,
        required:true
    },

	image: {
		type: String,
	},
    qualityController:
    {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
    }
});

module.exports = mongoose.model('profiledata', profileSchema);
