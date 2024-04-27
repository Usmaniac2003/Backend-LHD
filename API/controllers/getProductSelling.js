const ProductSelling = require('../models/getProductSelling');

const createProduct = async (req, res) => {
  try {
    const product = new ProductSelling({
      ambassadorId: req.body.ambassadorId,
      category: req.body.category,
      seller: req.body.seller,
      quantity: req.body.quantity,
      price: req.body.price,
      featured: req.body.featured,
      status: req.body.status
    });
    if(req.file)
    {
        product.image=req.file.path
    }
   
    await product.save();

   res.status(201).json({
      message: 'Product created successfully',
      product: product,
      
    });
  } catch (err) {
    console.error('Error while creating product:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getProductsSelling = async (req, res) => {
  try {
    const products = await ProductSelling.find();
    res.status(200).json(products);
  } catch (err) {
    console.error('Error while fetching products:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateProductSelling = async (req, res) => {
  try {
    const updatedProduct = await ProductSelling.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    console.error('Error while updating product:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const deleteProductsSelling = async (req, res) => {
  try {
    await ProductSelling.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error while deleting product:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  createProduct,
  getProductsSelling,
  updateProductSelling,
  deleteProductsSelling
};
