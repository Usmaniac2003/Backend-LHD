const BuisnessOpportunityProduct = require('../models/addProduct');
const QualityController = require('../models/qualityController')
const addProduct = async (req, res) => {
	try {
		const product = new BuisnessOpportunityProduct({
			title: req.body.title,
			date: req.body.date,
			opportunityDetails: req.body.opportunityDetails,
			status: req.body.status,
            qualityController:req.body. qualityController
		});
		if (req.file) {
			product.image = req.file.path;
		}

		await product.save();

		res.status(201).json({
			message: 'Product added successfully',
			product: product,
		});
	} catch (err) {
		console.error('Error while adding product:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const getProducts = async (req, res) => {
	try {
		const qualityControllerId = req.params.id; 
		const products = await BuisnessOpportunityProduct.find({ qualityController: qualityControllerId });
		res.status(200).json(products);
	} catch (err) {
		console.error('Error while fetching products:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const updateProduct = async (req, res) => {
	try {
		const updatedProduct = await BuisnessOpportunityProduct.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res
			.status(200)
			.json({ message: 'Product updated successfully', product: updatedProduct });
	} catch (err) {
		console.error('Error while updating product:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		await BuisnessOpportunityProduct.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Product deleted successfully' });
	} catch (err) {
		console.error('Error while deleting product:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	addProduct,
	getProducts,
	updateProduct,
	deleteProduct,
};
