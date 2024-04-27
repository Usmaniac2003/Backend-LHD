const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMulti')
const uploads = require('../middleware/upload');

// const qualityController = require        ('../controllers/qaualityController');
const qualityController= require('../controllers/qaualityController');
const uploadMulti = require('../middleware/QualityControllerFiles');
// update profile
router.patch('/updateprofile/:id', qualityController.updateProfile);
router.get('/getprofile/:id',qualityController.getProfiles);
// update quality controller status
router.patch('/approve-seller/:qualityControllerID/:id',qualityController.approveSeller);
// password change 
router.patch('/updatepasswordchangerequest/:id', qualityController.updatePasswordChangeRequest);
// racks routes
router.post('/addRack/:id',qualityController.createRack);
router.get('/getracks/:id',qualityController.getRacks);
router.get('/getracksbyId/:qcId/:id',qualityController.getRackById);
router.patch('/updaterack/:qcId/:id',qualityController.updateRack);
router.delete('/deleterack/:qcId/:id',qualityController.deleteRack);
// get all sellers
router.get('/getsellers',qualityController.getSeller)
// routes for warehouse
router.post('/addwarehouse/:id',qualityController.createWarehouse);
router.get('/getwarehouse/:id',qualityController.getWareHouses);
router.get('/getwarehousebyId/:id',qualityController.getWarehouseById);
router.patch('/updatewarehouse/:qcId/:id',qualityController.updateWarehouse);
router.delete('/deletewarehouse/:qcId/:id',qualityController.deleteWareHouse);

// routes for store
router.post('/addstore/:id', uploads.single('image'),qualityController.createStore);
router.get('/getstore/:id',qualityController.getStores);
router.get('/getstorebyId/:id',qualityController.getStoreById);
router.patch('/updatestore/:qcId/:id',qualityController.updateStore);
router.delete('/deletestore/:qcId/:id',qualityController.deleteStore);

router.post('/', uploadMulti, qualityController.createQualityController);
router.get('/',qualityController.getQualityController);
router.post('/withdraw',qualityController.withdrawAmount);
router.get('/withdraws/:id',qualityController.getAllWithdraws);
router.post('/topup',uploads.single('image'),qualityController.createTopUp);
router.get('/topups/:id',qualityController.getAllTopUps);
router.post('/transfer-payment',qualityController.transferPayment);
router.get('/transfer-payment/:id',qualityController.getAllPaymentTransfers);
router.post('/login',qualityController.loginQualityController);

router.post('/addjob', uploads.single('image'), qualityController.addJob);
router.get('/getjobs',qualityController.getJobs);
router.patch('/updatejob/:id',qualityController.updateJob);
router.delete('/deletejob/:id',qualityController.deleteJob);

router.post('/addproduct',uploads.single('image'),qualityController.addProduct);
router.get('/getproducts', qualityController.getProducts);
router.patch('/updateproducts/:id', qualityController.updateProduct);
router.delete('/deleteproducts/:id', qualityController.deleteProduct);


// approve product from the qualityController
router.patch('/approve-product/:qualityControllerID/:id',qualityController.approveSellingProduct);


// router.post('/createprofile', uploads.single('image'), qualityController.createProfile);
// router.get('/getprofiles',qualityController.getProfiles);
router.patch('/updateprofile/:qcId/:id',qualityController.updateProfile);
//router.delete('/deleteprofile/:id',qualityController.deleteProfile);
module.exports = router;