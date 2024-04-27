const SellingProduct = require('../models/productSelling');
const createSellingProduct = async (req, res) => {
	try {
		// console.log(req.body);
		let imageData = req.body.image;
		let documentData = req.body.images;

		if (
			!imageData &&
			req.files &&
			req.files.image &&
			req.files.image.length > 0
		) {
			imageData = '/image/' + req.files.image[0].filename;
		}

		if (
			!documentData &&
			req.files &&
			req.files.images &&
			req.files.images.length > 0
		) {
			documentData = req.files.images.map((file) => {
				'/document/' + file.filename;
				console.log(file.filename);
			});
		}

		// console.log(documentData);
		const delivery = JSON.parse(req.body.delivery).map(
			({ _id, ...rest }) => rest
		);

		const Productiontime = JSON.parse(req.body.productProductionionTime);
		// console.log(Productiontime);
		// Parse productProductionTime from string to JSON
		// const productProductionTime = JSON.parse(req.body.productProductionTime);

		// Check if req.body.productProductionTime is a string
		const productProductionTime =
			typeof req.body.productProductionTime === 'string'
				? JSON.parse(req.body.productProductionTime)
				: req.body.productProductionTime;

		const sellingProduct = new SellingProduct({
			sellerID:req.params.sellerID,
			productcategory: req.body.productcategory,
			sellingType: req.body.commerceType,
			productName: req.body.name,
			productType: req.body.foodCategory,
			category: req.body.categoryID,
			subcategory: req.body.subCategoryID,
			madeCountry: req.body.country,
			ownerType: req.body.ownerType,
			hsCode: req.body.code,
			productPrice: req.body.productPrice,
			adminCommision: req.body.adminCommision,
			admassadorCommision: req.body.admassadorCommision,
			subAdmassadorCommision: req.body.subAmbassadorComission,
			referralCommision: req.body.referralCommision,
			retailPrice: req.body.retailPrice,
			productQuantity: req.body.quantity,
			unit: req.body.unit,
			qualityOfProduct: req.body.quality,
			delivery: delivery,
			deliveryTime: req.body.deliveryTime,
			productDetails: req.body.productDetail,
			manufacturingDate: req.body.mdf_date,
			expireDate: req.body.exp_date,
			productProductionTime: Productiontime,
			// image: imageData,
			// images: documentData,
		});

		await sellingProduct.save();

		res.status(201).json({
			message: 'Selling product created successfully',
			sellingProduct: sellingProduct,
		});
	} catch (err) {
		console.error('Error while creating selling product:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
const getProductCategory = async (req, res) => {
	try {
		const categories = await SellingProduct.find().populate('productcategory');
		res.status(200).json(categories);
	} catch (err) {
		console.error('Error while fetching categories:', err);
		res.status(500).json({
			error: err.message,
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
	deleteSellingProduct,
};
