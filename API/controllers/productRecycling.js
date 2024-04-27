const SellingProduct = require('../models/productRecycling');
const ProductCategory = require('../models/productCategoryRecycling');

const createSellingProduct = async (req, res) => {
  try {
    let imageData = [];
    let documentData = [];

    if (req.files && req.files.image && req.files.image.length > 0) {
        imageData = req.files.image.filter(file => file.mimetype.startsWith('image')).map(file => '/image/' + file.filename);
    }

    if (req.files && req.files.images && req.files.images.length > 0) {
        documentData = req.files.images.filter(file => file.mimetype.startsWith('image')).map(file => '/document/' + file.filename);
    }

    const sellingProductData = {
      productCategory: req.body.categoryId,
      category: req.body.categoriesname,
      subcategory: req.body.subCategoryname,
      productType: req.body.productType,
      productName: req.body.name,
      lifeDayFromSaleDay: req.body.daySelect,
      priceReduction: req.body.priceReduction,
      productPrice: req.body.productPrice,
      adminCommission: req.body.adminCommission,
      ambassadorCommission: req.body.QualityControllerComission,
      subAmbassadorCommission: req.body.subQualityControllerCommission,
      referralCommission: req.body.referralCommission,
      retailPrice: req.body.retailPrice,
      productQuantity: req.body.quantity,
      hsCode: req.body.code,
      unit:req.body.unit,
      qualityOfProduct: req.body.quality,
      delivery: req.body.delivery,
      deliveryTime: req.body.delivery,
      madeInCountry: req.body.country,
      damagePolicy: req.body.damagePolicy,
      productDetails: req.body.productDetail,
      productProductionTime: req.body.productProductionTime,
      image: imageData[0],
      images: documentData,
     

    };

    const sellingProduct = new SellingProduct(sellingProductData);
    await sellingProduct.save();

    res.status(201).json({
      message: 'Selling product created successfully',
      sellingProduct: sellingProduct
    });
  } catch (err) {
    console.error('Error while creating selling product:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getProductCategory = async (req, res) => {
  try {
    const categories = await SellingProduct.find().populate('category');
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error while fetching categories:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateSellingProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    await SellingProduct.findByIdAndUpdate(productId, updates);
    res.status(200).json({ message: 'Selling product updated successfully' });
  } catch (err) {
    console.error('Error while updating selling product:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteSellingProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await SellingProduct.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Selling product deleted successfully' });
  } catch (err) {
    console.error('Error while deleting selling product:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSellingProduct,
  getProductCategory,
  updateSellingProduct,
  deleteSellingProduct
};
