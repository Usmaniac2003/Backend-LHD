const Event = require('../models/events');

const createEvent = async (req, res) => {
	try {
		
		// const documentData = req.files.images.map(file => '/document/' + file.filename);
		const event = new Event({
			name: req.body.name,
			serviceProvider: req.body.serviceProvider,
			providerContact: req.body.providerContact,
			validityDate: req.body.validityDate,
			eventDetails: req.body.eventDetails,
			status: req.body.status,
			
		});
		if(req.file)
		{
			event.image=req.file.path
		}

		await event.save();

		res.status(201).json({
			message: 'Event created successfully',
			event: event,
		});
	} catch (err) {
		console.error('Error while creating event:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const getEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.status(200).json(events);
	} catch (err) {
		console.error('Error while fetching events:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const updateEvent = async (req, res) => {
	try {
		const updatedEvent = await Event.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res
			.status(200)
			.json({ message: 'Event updated successfully', event: updatedEvent });
	} catch (err) {
		console.error('Error while updating event:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

const deleteEvent = async (req, res) => {
	try {
		await Event.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Event deleted successfully' });
	} catch (err) {
		console.error('Error while deleting event:', err);
		res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	createEvent,
	getEvents,
	updateEvent,
	deleteEvent,
};
