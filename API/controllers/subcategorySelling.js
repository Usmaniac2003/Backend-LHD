const productSubcategorySelling = require('../models/productSubcategorySellling');

const createProductSubcategorySelling = async (req, res) => {
  try {
    const product = new productSubcategorySelling({
      categoryType: "selling",
      category: req.body.category,
      subCategoryTitle: req.body.subCategoryTitle,
    });

    await product.save();

    res.status(201).json({
      message: 'Product Sub Categories selling created successfully',
      product: product,
     });
  } catch (err) {
    console.error('Error while creating categories:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getProductSubCategorySelling = async (req, res) => {
  try {
    const subcategory = await productSubcategorySelling.find();
    res.status(200).json(subcategory);
  } catch (err) {
    console.error('Error while fetching subcategories selling:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateProductSubcategorySelling = async (req, res) => {
  try {
    const updatedProduct = await productSubcategorySelling.findByIdAndUpdate(
      req.params.id,
      { subCategoryTitle: req.body.subCategoryTitle, category: req.body.category },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product Sub Category Selling not found' });
    }
    res.status(200).json({ message: 'Product Sub Category Selling updated successfully', product: updatedProduct });
  } catch (err) {
    console.error('Error while updating product subcategory:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const deleteProductSubcategorySelling = async (req, res) => {
  try {
    await productSubcategorySelling.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product Sub Category deleted successfully' });
  } catch (err) {
    console.error('Error while deleting product subcategory:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  createProductSubcategorySelling,
  getProductSubCategorySelling,
  updateProductSubcategorySelling,
  deleteProductSubcategorySelling
};
