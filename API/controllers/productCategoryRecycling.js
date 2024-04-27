const productCategory = require('../models/productCategoryRecycling');
const productSubcategoryRecycling= require('../models/ProductSubcategoryRecycling')

const createProductCategory = async (req, res) => {
  try {
    const product = new productCategory({
    productsubcategoryrecycling: req.body. productsubcategoryrecycling,
     category: "recycling",
     categoryTitle: req.body.categoryTitle,
     adminMinimumCommision: req.body.adminMinimumCommision,
     status: req.body.status,
     
    });


  await product.save();

   res.status(201).json({
      message: 'Product Categories created successfully',
      product: product,
      
    });
  } catch (err) {
    console.error('Error while creating categories:', err);
    res.status(500).json({
      error: err.message
    });
  }
};
const getProductCategory = async (req, res) => {
  try {
    const category = await productCategory.find().populate('productsubcategoryrecycling');
    res.status(200).json(category);
  } catch (err) {
    console.error('Error while fetching categories:', err);
    res.status(500).json({
      error: err.message
    });
  }
};
const updateProductCategory = async (req, res) => {
  try {
    // Extracting fields from req.body
    const { categoryTitle, adminMinimumCommision, status } = req.body;

    // Fetching the original product category
    const originalProduct = await productCategory.findById(req.params.id);

    // Updating the product category with only the allowed fields
    const updatedProduct = await productCategory.findByIdAndUpdate(req.params.id, {
      category: originalProduct.category, // Ensure category remains unchanged
      categoryTitle,
      adminMinimumCommision,
      status
    }, { new: true });

    // Determine which fields have been changed
    const changedFields = {};
    if (updatedProduct.categoryTitle !== originalProduct.categoryTitle) {
      changedFields.categoryTitle = updatedProduct.categoryTitle;
    }
    if (updatedProduct.adminMinimumCommision !== originalProduct.adminMinimumCommision) {
      changedFields.adminMinimumCommision = updatedProduct.adminMinimumCommision;
    }
    if (updatedProduct.status !== originalProduct.status) {
      changedFields.status = updatedProduct.status;
    }

    res.status(200).json({ message: 'Product Category updated successfully', product: updatedProduct, changedFields });
  } catch (err) {
    console.error('Error while updating product category:', err);
    res.status(500).json({
      error: err.message
    });
  }
};




const deleteProductCategory = async (req, res) => {
  try {
    await productCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product  Category deleted successfully' });
  } catch (err) {
    console.error('Error while deleting product category:', err);
    res.status(500).json({
      error: err.message
    });
  }
};


module.exports = {
    createProductCategory,
    getProductCategory,
    updateProductCategory,
    deleteProductCategory
};
