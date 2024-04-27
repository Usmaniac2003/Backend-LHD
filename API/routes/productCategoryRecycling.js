const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/productCategoryRecycling');
router.post('/recycling', categoryController.createProductCategory)
router.get ('/recycling', categoryController.getProductCategory)
router.patch('/recycling/:id', categoryController.updateProductCategory)
router.delete('/recycling/:id', categoryController.deleteProductCategory)
.get((req, res) => {
   res.status(200).json(
    { 
        message: 'GET request to /api/form received' 
    }
    );
  });;

module.exports = router;
