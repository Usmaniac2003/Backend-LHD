const express = require('express');
const router = express.Router();
const jobController = require('../controllers/addJobsController');
const upload = require('../middleware/upload');

router.post('/addjob', upload.single('image'), jobController.addJob);
router.get('/getjobs', jobController.getJobs);
router.patch('/updatejob/:id', jobController.updateJob);
router.delete('/deletejob/:id', jobController.deleteJob);

module.exports = router;
