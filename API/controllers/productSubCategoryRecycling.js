const productSubcategory = require('../models/ProductSubcategoryRecycling');

const createProductSubcategory = async (req, res) => {
  try {
    const product = new productSubcategory({
      categoryType: "recycling",
      category: req.body.category,
      subCategoryTitle: req.body.subCategoryTitle,
    });

    await product.save();

    res.status(201).json({
      message: 'Product Sub Categories created successfully',
      product: product,
     });
  } catch (err) {
    console.error('Error while creating categories:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getProductSubCategory = async (req, res) => {
  try {
    const subcategory = await productSubcategory.find();
    res.status(200).json(subcategory);
  } catch (err) {
    console.error('Error while fetching subcategories:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateProductSubcategory = async (req, res) => {
  try {
    const updatedProduct = await productSubcategory.findByIdAndUpdate(
      req.params.id,
      { subCategoryTitle: req.body.subCategoryTitle, category: req.body.category },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product Sub Category not found' });
    }
    res.status(200).json({ message: 'Product Sub Category updated successfully', product: updatedProduct });
  } catch (err) {
    console.error('Error while updating product subcategory:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const deleteProductSubcategory = async (req, res) => {
  try {
    await productSubcategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product Sub Category deleted successfully' });
  } catch (err) {
    console.error('Error while deleting product subcategory:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  createProductSubcategory,
  getProductSubCategory,
  updateProductSubcategory,
  deleteProductSubcategory
};
