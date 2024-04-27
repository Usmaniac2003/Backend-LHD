const express = require('express');
const router = express.Router();
const profileController = require('../controllers/editProfile');
const upload = require('../middleware/upload');

router.post('/createprofile', upload.single('image'), profileController.createProfile);
router.get('/getprofiles', profileController.getProfiles);
router.patch('/updateprofile/:id', profileController.updateProfile);
router.delete('/deleteprofile/:id', profileController.deleteProfile);

module.exports = router;
