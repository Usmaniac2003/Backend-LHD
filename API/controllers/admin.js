const db = require('mongodb');

const admin = require('../models/admin');
const qualityController = require('../models/qualityController');
const brand = require('../models/brand');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const expo = require('../models/expo');
const sellerPackage = require('../models/sellerPackage');
//const  productCategory = require('../models/manageProductCategory');
const productSubcategory = require('../models/ProductSubcategoryRecycling');
const ambassadorPackage = require('../models/ambassadorPackage');
const bcrypt = require('bcrypt');
///Create a new Admin {SignIn}
const createAdmin = async (req, res, next) => {
	const admins = new admin({
		name: 'Admin',
		email: 'admin@admin.com',
		password: 'admin@1234',
		token: '',
	});
	// .then((results) => {
	//   console.log(results);
	//   res.status(201).json({
	//     message: "Admin Created",
	//   });
	// })
	// .catch((err) => {
	//   console.log(err);
	//   res.status(500).json({
	//     error: err,
	//   });
	let token;
	try {
		token = jwt.sign(
			{
				adminId: createAdmin.id,
			},
			'supersecret_confidential',
			{ expiresIn: '1h' }
		);
		admins.token = token;
	} catch (err) {
		console.log('signUP failed', 500);
	}
	res.status(201).json({
		adminId: admins.id,
		email: admins.email,
		token: admins.token,
	});
	admins.save();
	// return next();
};
//         }
// Get JWT token
const getToken = (id) => {
	let token;
	try {
		token = jwt.sign(
			{
				adminId: id,
			},
			'supersecret_confidential',
			{ expiresIn: '1h' }
		);
		return token;
	} catch (err) {
		console.log('signUP failed', 500);
	}
};
// Get Admin from database {Login}
const getAdmin = async (req, res, next) => {
	// let admins;
	try {
		const admins = await admin
			.findOne({ email: req.body.email, password: req.body.password })
			.then((admin) => {
				res.status(201).json({
					email: admin.email,
					token: getToken(admin.id),
				});
			});
	} catch (err) {
		console.error('Error token:', err);
		res.status(400).json({
			error: err.message,
			res: req.body
		});
	}
};

// Create Manage Pages
// const createManagePages = async (req, res, next) => {};

const getQualityController = async (req, res, next) => {
	try {
		const Controllers = await qualityController.find({
			email: req.body.email,
			name: req.body.name,
		});
		res.send({ status: 'ok', data: Controllers });
	} catch (err) {
		console.error('Error token:', err);
		res.status(500).json({
			error: err,
		});
	}
};
// cosnt id = req.params.qualityControllerId;
//   qualityController.findById(id)

//  .exec().then(
//   doc=>{
//     console.log(doc);
//     res.status(200).json(doc);
//   }
//  ).catch((err) => {
//   console.log(err);
//   res.status(500).json({ error: err });
//  });
// };
const deleteQualityController = async (req, res, next) => {
	const qualityControllerId = req.params.qualityControllerId;
	console.log(qualityControllerId);
	qualityController
		.deleteOne({ _id: qualityControllerId })
		.exec()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

const updateQualityController = async (req, res, next) => {
	const id = req.params.qualityControllerIdId;
	console.log(id);
	qualityController
		.updateOne(
			{ _id: id },
			{
				yourName: req.body.yourName,
				servicePost: req.body.servicePost,
				chooseProfile: req.body.chooseProfile,
				yourEmail: req.body.yourEmail,
				uploadCv: req.body.uploadCv,
				previousExperience: req.body.previousExperience,
				generalSkills: req.body.generalSkills,
				youtubeVideoLink: req.body.youtubeVideoLink,
				selectPackage: req.body.selectPackage,
				bankAccount: req.body.bankAccount,
				branceCode: req.body.branceCode,
				mobileAccount: req.body.mobileAccount,
				registeration: req.body.registeration,
				gender: req.body.gender,
				address: req.body.address,
			}
		)
		.exec()
		.then((result) => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

/////////Brands////////

const creatBrand = async (req, res, next) => {
	const Brands = new brand({
		// _id: new mongoose.Types.ObjectId(),
		brandLink: req.body.brandLink,
		status: req.body.status,
	});
	///Image file uploading
	if (req.file) {
		Brands.brandImage = req.file.path;
	}
	Brands.save()
		.then((docs) => {
			console.log(docs);
			res.status(201).json({ message: 'Brand Created', brand: docs });
		})
		.catch((err) => {
			console.log(err.message);
			res.status(500).json({ error: err });
		});
};
const updateBrand = async (req, res, next) => {
	const id = req.params.brandId;
	console.log(id);
	brand
		.updateOne(
			{ _id: id },
			{
				brandLink: req.body.brandLink,
				brandImage: req.body.brandImage,
				status: req.body.status,
			}
		)
		.exec()
		.then((result) => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};
const deleteBrand = async (req, res, next) => {
	const id = req.params.brandID;
	brand
		.deleteOne({ _id: id }) // or findOneAndDelete
		.exec()
		.then((result) => {
			res.status(200).json({ result });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

const getBrand = async (req, res, next) => {
	try {
		const Brand = await brand.find({});
		res.send({ status: 'ok', data: Brand });
	} catch (err) {
		console.error('Error token:', err);
		res.status(500).json({
			error: err,
		});
	}
};
const getByBrandId = async (req, res, next) => {
	const id = req.params.brandId;
	brand
		.findById(id)
		.exec()
		.then((docs) => {
			console.log('From dataBase', docs);
			if (docs) {
				res.status(200).json(docs);
			} else {
				res.status(404).json({
					message: 'No valid Entry Found...',
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

//////// Manage Products///////

const createProductCategory = async (req, res) => {
	try {
		const product = new productcategories({
			category: req.body.category,
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
			error: err.message,
		});
	}
};

const getProductCategory = async (req, res) => {
	try {
		const category = await productCategory.find();
		res.status(200).json(category);
	} catch (err) {
		console.error('Error while fetching categories:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
// try {
//   const Controllers = await qualityController.find({});
//   res.send({ status: "ok", data: Controllers });
// } catch (err) {
//   console.error("Error token:", err);
//   res.status(500).json({
//     error: err
//   });
// }

const updateProductCategory = async (req, res) => {
	try {
		const updatedProduct = await productCategory.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json({
			message: 'Product Category updated successfully',
			product: updatedProduct,
		});
	} catch (err) {
		console.error('Error while updating product category:', err);
		res.status(500).json({
			error: err.message,
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
			error: err.message,
		});
	}
};

////////ManageProductSubCategory/////////

const createProductSubcategory = async (req, res) => {
	try {
		const product = new productSubcategory({
			categoryType: req.body.categoryType,
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
			error: err.message,
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
			error: err.message,
		});
	}
};

const updateProductSubcategory = async (req, res) => {
	try {
		const updatedProduct = await productSubcategory.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json({
			message: 'Product Sub Category updated successfully',
			product: updatedProduct,
		});
	} catch (err) {
		console.error('Error while updating product subcategory:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const deleteProductSubcategory = async (req, res) => {
	try {
		await productSubcategory.findByIdAndDelete(req.params.id);
		res
			.status(200)
			.json({ message: 'Product Sub Category deleted successfully' });
	} catch (err) {
		console.error('Error while deleting product subcategory:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
//expo controllers
const createExpo = async (req, res) => {
	const imageData = req.files.image.map((file) => '/image/' + file.filename);
	const documentData = req.files.images.map(
		(file) => '/document/' + file.filename
	);
	const createdExpo = new expo({
		expoName: req.body.expoName,
		expoDate: req.body.expoDate,
		expoDetails: req.body.expoDetails,
		expoLink: req.body.expoLink,
		expoStatus: req.body.expoStatus,
		image: imageData[0],
		images: documentData,
	});

	await createdExpo
		.save()
		.then((results) => {
			console.log(results);
			res.status(201).json({
				message: 'expo Created',
				results,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
const deleteExpo = async (req, res) => {
	try {
		await expo.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Expo deleted successfully' });
	} catch (err) {
		console.error('Error while deleting expo:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
const getExpo = async (req, res) => {
	try {
		const allexpos = await expo.find();
		res.status(200).json(allexpos);
	} catch (err) {
		console.error('Error while fetching expos:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
const updateExpo = async (req, res) => {
	try {
		const updatedExpo = await expo.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json({
			message: 'Expo is updated successfully',
			product: updatedExpo,
		});
	} catch (err) {
		console.error('Error while updating expo:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
const getExpoById = async (req, res) => {
	const id = req.params.id;
	expo
		.findById(id)
		.exec()
		.then((docs) => {
			console.log('From dataBase', docs);
			if (docs) {
				res.status(200).json(docs);
			} else {
				res.status(404).json({
					message: 'No valid Entry Found...',
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};
const createSellerPackage = async (req, res, next) => {
	const createdSellerPackage = new sellerPackage({
		title: req.body.title,
		storeCharges: req.body.storePrice,
		packageName: req.body.packageName,
		minimumStoreCreated: req.body.minimumStore,
		type: req.body.type,
	});
	createdSellerPackage
		.save()
		.then((results) => {
			res
				.status(201)
				.json({ message: 'Seller Package is created:', createdSellerPackage });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};
const getSellerPackages = async (req, res) => {
	try {
		const allSellerPackages = await sellerPackage
			.find({})
			.exec()
			.then((results) => {
				res.status(200).json(results);
			})
			.catch((err) => {
				res.status(500).json({ error: err });
			});
	} catch (err) {
		res.status(500).json({ error: err });
	}
};
const updateSellerPackage = async (req, res) => {
	try {
		const updatedSellerPackage = await sellerPackage.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json({
			message: 'seller package is updated successfully',
			sellerPackage: updatedSellerPackage,
		});
	} catch (err) {
		console.error('Error while updating seller package:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
const deleteSellerPackage = async (req, res) => {
	try {
		await sellerPackage.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'seller package deleted successfully' });
	} catch (err) {
		console.error('Error while deleting sellerpackage:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
const getSellerPackageById = async (req, res) => {
	const id = req.params.id;
	sellerPackage
		.findById(id)
		.exec()
		.then((docs) => {
			console.log('From dataBase', docs);
			if (docs) {
				res.status(200).json(docs);
			} else {
				res.status(404).json({
					message: 'No valid Entry Found...',
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};
const createAmbassadorPackage = async (req, res, next) => {
	const createdAmbassadorPackage = new ambassadorPackage({
		title: req.body.title,
		storeCharges: req.body.storePrice,
		mainStockCharges: req.body.mainStockPrice,
		packageName: req.body.packageName,
		minimumStoreCreated: req.body.minimumStore,
		type: req.body.type,
	});

	createdAmbassadorPackage
		.save()
		.then((result) => {
			res.status(201).json({
				message: 'Ambesseder Package is created:',
				createdAmbassadorPackage,
			});
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};
const getAmbassadorPackages = async (req, res) => {
	try {
		const allPackages = await ambassadorPackage
			.find({})
			.exec()
			.then((packages) => {
				res.status(200).json(packages);
			})
			.catch((err) => {
				res.status(500).json({ error: err });
			});
	} catch (err) {
		res.status(500).json({ error: err });
	}
};
const updateAmbassadorPackage = async (req, res) => {
	try {
		const updatedAmbassadorPackage = await ambassadorPackage.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json({
			message: 'Ambassador package is updated successfully',
			updatedPackage: updatedAmbassadorPackage,
		});
	} catch (err) {
		console.error('Error while updating Ambassador package:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
const deleteAmbassadorPackage = async (req, res) => {
	try {
		await ambassadorPackage.findByIdAndDelete(req.params.id);
		res
			.status(200)
			.json({ message: 'Ambassador package deleted successfully' });
	} catch (err) {
		console.error('Error while deleting ambassadorPackage:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
const getAmbassadorPackageById = async (req, res) => {
	const id = req.params.id;
	ambassadorPackage
		.findById(id)
		.exec()
		.then((docs) => {
			console.log('From dataBase', docs);
			if (docs) {
				res.status(200).json(docs);
			} else {
				res.status(404).json({
					message: 'No valid Entry Found...',
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};
const updateQualityControllerStatus = async (req, res) => {
	try {
		const updatedStatus = await qualityController.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json({
			message: 'Quality controller is updated successfully',
			updatedPackage: updatedStatus,
		});
	} catch (err) {
		console.error('Error while updating Ambassador package:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};
module.exports = {
	getAmbassadorPackages,
	updateQualityControllerStatus,
	updateAmbassadorPackage,
	createAmbassadorPackage,
	deleteAmbassadorPackage,
	getAmbassadorPackageById,
	updateSellerPackage,
	deleteSellerPackage,
	getSellerPackageById,
	getSellerPackages,
	createSellerPackage,
	createExpo,
	updateExpo,
	deleteExpo,
	getExpo,
	getExpoById,
	createAdmin,
	getAdmin,
	getQualityController,
	deleteQualityController,
	updateQualityController,
	creatBrand,
	getBrand,
	updateBrand,
	deleteBrand,
	getByBrandId,
	createProductCategory,
	getProductCategory,
	updateProductCategory,
	deleteProductCategory,
	createProductSubcategory,
	getProductSubCategory,
	updateProductSubcategory,
	deleteProductSubcategory,
};
