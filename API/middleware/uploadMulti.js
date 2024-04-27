const express = require('express');
const multer = require('multer');
const path = require('path');

const user = express();

// Body parsing middleware
user.use(express.json());
user.use(express.urlencoded({ extended: true }));

// Serve static files
user.use(express.static('public'));

// Multer storage configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let destFolder = ''; // Variable to hold the destination folder

		// Check the fieldname and set the destination folder accordingly
		if (file.fieldname === 'image') {
			destFolder = path.join(__dirname, 'public', 'image');
		} else if (file.fieldname === 'images') {
			destFolder = path.join(__dirname, 'public', 'document');
		} else {
			// If the fieldname is invalid, return an error
			return cb(new Error('Invalid file field'));
		}

		// Ensure the destination directory exists, if not, create it
		require('fs').mkdir(destFolder, { recursive: true }, (err) => {
			if (err) {
				return cb(err);
			}
			cb(null, destFolder);
		});
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname); // Use the original filename as the filename
	},
});

// Multer file filter configuration
const fileFilter = (req, file, cb) => {
	// Check mimetype for images
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false); // Reject non-image files
	}
};

// Multer configuration
const uploadMulti = multer({
	storage: storage,
	fileFilter: fileFilter,
}).fields([
	{ name: 'images', maxCount: 5 },
	{ name: 'image', maxCount: 1 },
]);

module.exports = uploadMulti;
