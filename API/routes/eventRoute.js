const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const upload = require('../middleware/upload');

router.post('/events', upload.single('image'), eventController.createEvent);
router.get('/events', eventController.getEvents);
router.patch('/events/:id', eventController.updateEvent);
router
	.delete('/events/:id', eventController.deleteEvent)
	.get('/', (req, res) => {
		res.status(200).json({ message: 'GET request to /api/events received' });
	});

module.exports = router;
