const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const uploadMulti = require('../middleware/uploadMulti');

router.post('/addbanner', uploadMulti,  bannerController.createBanner);
router.get('/getbanner',  bannerController.getBanners);
router.patch('/update/:id', bannerController.updateBanner);
router.delete('/delete/:id', bannerController.deleteBanner);

module.exports = router;
