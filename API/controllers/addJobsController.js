const JobProduct = require('../models/addJobs');
const QualityController = require('../models/qualityController')

const addJob = async (req, res) => {
	try {
		const job = new JobProduct({
			title: req.body.title,
			date: req.body.date,
			opportunityDetails: req.body.opportunityDetails,
			status: req.body.status,
            qualityController:req.body.qualityController
		});
		if (req.file) {
			job.image = req.file.path;
		}

		await job.save();

		res.status(201).json({
			message: 'Job added successfully',
			job: job,
		});
	} catch (err) {
		console.error('Error while adding job:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const getJobs = async (req, res) => {
	try {
		const qualityControllerId = req.params.id;
		const jobs = await JobProduct.find({ qualityController: qualityControllerId });
		res.status(200).json(jobs);
	} catch (err) {
		console.error('Error while fetching jobs:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const updateJob = async (req, res) => {
	try {
		const updatedJob = await JobProduct.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res
			.status(200)
			.json({ message: 'Job updated successfully', job: updatedJob });
	} catch (err) {
		console.error('Error while updating job:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const deleteJob = async (req, res) => {
	try {
		await JobProduct.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Job deleted successfully' });
	} catch (err) {
		console.error('Error while deleting job:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	addJob,
	getJobs,
	updateJob,
	deleteJob,
};
