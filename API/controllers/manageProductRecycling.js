const Product = require('../models/manageProductRecycling');

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      ambassadorId: req.body.ambassadorId,
      category: req.body.category,
      seller: req.body.seller,
      quantity: req.body.quantity,
      price: req.body.price,
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

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error('Error while fetching products:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    console.error('Error while updating product:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
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
  getProducts,
  updateProduct,
  deleteProduct
};
