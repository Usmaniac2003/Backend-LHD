const express = require('express');
const router = express.Router();
const productController = require('../controllers/addProductController');
const upload = require('../middleware/upload')


router.post('/addproduct',upload.single('image'), productController.addProduct);


router.get('/getproducts', productController.getProducts);


router.patch('/updateproducts/:id', productController.updateProduct);


router.delete('/deleteproducts/:id', productController.deleteProduct);

module.exports = router;
