const express = require('express');
const router = express.Router();
const productController = require('../controllers/productRecycling');
const uploadMulti= require('../middleware/uploadMulti')

router.post('/recycling',uploadMulti,productController.createSellingProduct )
router.get('/recycling',productController.getProductCategory )
router.patch('/recycling/:id',productController.updateSellingProduct )
router.delete('/recycling/:id',productController.deleteSellingProduct)
.get((req, res) => {
   res.status(200).json(
    { 
        message: 'GET request to /api/form received' 
    }
    );
  });;
 
module.exports = router;
