const express = require('express');
const router = express.Router();
const sellingController = require('../controllers/productSelling');
const uploadMulti = require('../middleware/uploadMulti');

router.post('/sellingss',uploadMulti,sellingController.createSellingProduct)
router.get('/sellingss', sellingController.getProductCategory)
router.patch('/sellingss/:id', sellingController.updateSellingProduct)
router.delete('/sellingss/:id', sellingController.deleteSellingProduct)
  .get((req, res) => {
    res.status(200).json({ 
      message: 'GET request to /api/form received' 
    });
  });

module.exports = router;
