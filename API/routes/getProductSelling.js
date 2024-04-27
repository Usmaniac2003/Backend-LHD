const express = require('express');
const router = express.Router();
const categorySellingcontroller = require('../controllers/getProductSelling');
const upload= require('../middleware/upload')
router.post('/sellings/:sellerID', upload.single('image'),categorySellingcontroller.createProduct)
router.get('/sellings', categorySellingcontroller. getProductsSelling)
router.patch('/sellings/:id', categorySellingcontroller.updateProductSelling)
router.delete('/sellings/:id',categorySellingcontroller.deleteProductsSelling)
.get((req, res) => {
   res.status(200).json(
    { 
        message: 'GET request to /api/form received' 
    }
    );
  });;

module.exports = router;
