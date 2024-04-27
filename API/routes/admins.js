const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const upload = require('../middleware/upload');
const uploadMulti = require('../middleware/uploadMulti');

/////ADMIN form
router.post('/signup', adminController.createAdmin);
router.post('/', adminController.getAdmin);

router.get('/qualityControllers', adminController.getQualityController);
router.delete(
	'/deleteController/:qualityControllerId',
	adminController.deleteQualityController
);
// router.patch('/qualityControllersId', adminController.updateQualityController);
// router.patch('/qualityControllersId', adminController.updateQualityController);

//seller Routes
router.post('/createSellerPackage', adminController.createSellerPackage);
router.get('/seller-package/:id', adminController.getSellerPackageById);
router.get('/seller-package', adminController.getSellerPackages);
router.delete('/deletesellerPackage/:id', adminController.deleteSellerPackage);
router.patch('/updateSellerPackage/:id', adminController.updateSellerPackage);

//ambesseder Packages Routes
router.get('/ambassador-packages', adminController.getAmbassadorPackages);
router.post(
	'/createAmbassadorPackage',
	adminController.createAmbassadorPackage
);
router.get('/ambassador-package/:id', adminController.getAmbassadorPackageById);
router.delete(
	'/deleteAmbassadorPackage/:id',
	adminController.deleteAmbassadorPackage
);
router.patch(
	'/updateAmbassadorPackage/:id',
	adminController.updateAmbassadorPackage
);

router.patch(
	'/aproveQualityController',
	adminController.updateQualityControllerStatus
);
// /Brand routes
//router.post('/createBrand',upload.firstSingleImageUpload.single('brandImage'), adminController.creatBrand);
router.post(
	'/createBrand',
	upload.single('brandImage'),
	adminController.creatBrand
);
router.get('/brand', adminController.getBrand);
router.get('/brand/:brandId', adminController.getByBrandId);
router.patch('/updateBrand/:brandId', adminController.updateBrand);
router.delete('/deleteBrand/:brandId', adminController.deleteBrand);

///ProductCategory routes
router.post('/productCategory', adminController.createProductCategory);
router.get('/productCategory', adminController.getProductCategory);
router.patch('/productCategory/:id', adminController.updateProductCategory);
router.delete('/productCategory/:id', adminController.deleteProductCategory);

///Product Sub Category routes
router.post('/productSubCategory', adminController.createProductSubcategory);
router.get('/productSubCategory', adminController.getProductSubCategory);
router.patch(
	'/productSubCategory/:id',
	adminController.updateProductSubcategory
);
router.delete(
	'/productSubCategory/:id',
	adminController.deleteProductSubcategory
);
router.post('/productSubCategory', adminController.createProductSubcategory);
router.get('/productSubCategory', adminController.getProductSubCategory);
router.patch(
	'/productSubCategory/:id',
	adminController.updateProductSubcategory
);
router.delete(
	'/productSubCategory/:id',
	adminController.deleteProductSubcategory
);

router.get('/expo', adminController.getExpo);
router.post('/createExpo', uploadMulti, adminController.createExpo);
router.patch('/updateExpo/:id', adminController.updateExpo);
router.delete('/deleteExpo/:id', adminController.deleteExpo);
router.get('/expo/:id', adminController.getExpoById);

module.exports = router;
