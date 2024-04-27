const express = require('express');
const router = express.Router();
const categorySubcontroller = require('../controllers/productSubCategoryRecycling');
router.post('/subcategoriesrecycling', categorySubcontroller.createProductSubcategory)
router.get('/subcategoriesrecycling', categorySubcontroller. getProductSubCategory)
router.patch('/subcategoriesrecycling/:id', categorySubcontroller.updateProductSubcategory)
router.delete('/subcategoriesrecycling/:id', categorySubcontroller.deleteProductSubcategory)
.get((req, res) => {
   res.status(200).json(
    { 
        message: 'GET request to /api/form received' 
    }
    );
  });;

module.exports = router;
