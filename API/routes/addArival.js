const express = require('express');
const router = express.Router();
const createArival = require('../controllers/addArival');
const upload= require('../middleware/upload')
router.post('/', upload.single('image'),createArival.createArival)

.get((req, res) => {
   res.status(200).json(
    { 
        message: 'GET request to /api/form received' 
    }
    );
  });;

module.exports = router;
