const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/productCategorySelling');

router.post('/selling', categoryController.createProductCategory);
router.get('/selling', categoryController.getProductCategory);
router.patch('/selling/:id', categoryController.updateProductCategory);
router.delete('/selling/:id', categoryController.deleteProductCategory);

module.exports = router;
