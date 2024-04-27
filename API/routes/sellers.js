const express = require('express');
const router = express.Router();

const sellerController = require('../controllers/seller')
const chechAuth = require('../middleware/check-auth')
const upload = require('../middleware/upload')




// router.use(chechAuth);
// router.post('/',upload.single('brandImage'), sellerController.createSeller =>{

// });
router.post('/', upload.single('image'),  sellerController.createSeller);
router.get('/',sellerController.loginSeller);
router.post('/login',sellerController.loginSeller);
router.patch('/update',upload.single('image'),sellerController.updateSeller);


module.exports = router;