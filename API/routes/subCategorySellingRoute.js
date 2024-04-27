const express = require('express');
const router = express.Router();
const categorySubcontroller = require('../controllers/subcategorySelling');
router.post('/subcategoriesselling', categorySubcontroller.createProductSubcategorySelling)
router.get('/subcategoriesselling', categorySubcontroller.getProductSubCategorySelling)
router.patch('/subcategoriesselling/:id', categorySubcontroller.updateProductSubcategorySelling)
router.delete('/subcategoriesselling/:id', categorySubcontroller.deleteProductSubcategorySelling)
.get((req, res) => {
   res.status(200).json(
    { 
        message: 'GET request to /api/form received' 
    }
    );
  });;

module.exports = router;
