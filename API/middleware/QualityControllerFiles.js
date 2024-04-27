const express = require('express');
const multer = require('multer');
const path = require('path');

const user = express();

// Body parsing middleware
user.use(express.json());
user.use(express.urlencoded({ extended: true }));

// Serve static files
user.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let destFolder = ''; // Variable to hold the destination folder

        // Set the destination folder based on the fieldname
        switch (file.fieldname) {
            case 'profile':
            case 'cnicFront':
            case 'cnicBack':
            case 'logo':
                destFolder = path.join(__dirname, 'public', 'image');
                break;
            case 'cv':
                destFolder = path.join(__dirname, 'public', 'cvs');
                break;
            default:
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
    filename: function(req, file, cb) {
        // Generate a unique filename to avoid collisions
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Check mimetype for images and documents
    if ((file.fieldname !== 'cv' && (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) ||
        (file.fieldname === 'cv' && (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword'))) {
        cb(null, true);
    } else {
        cb(null, false); // Reject non-image and non-document files
    }
};

const uploadMulti = multer({
    storage: storage,
    fileFilter: fileFilter
}).fields([{ name: 'profile', maxCount: 1 }, { name: 'cnicFront', maxCount: 1 },{ name: 'cnicBack', maxCount: 1 },{ name: 'cv', maxCount: 1 },{ name: 'logo', maxCount: 1 }]);

module.exports = uploadMulti;
