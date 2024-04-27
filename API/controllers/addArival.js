const  Arival= require('../models/addArival');

const createArival = async (req, res) => {
  try {
    const arival = new Arival({
      name: req.body.name,
      date: req.body.date,
      arrivalDetail: req.body.arrivalDetail,
      featured: req.body.featured,
      status: req.body. status,
    
    });
    if(req.file)
    {
        arival.image=req.file.path
    }
   
    await arival.save();

   res.status(201).json({
      message: 'Arival Record created successfully',
      arival:arival,
      
    });
  } catch (err) {
    console.error('Error while creating arrival :', err);
    res.status(500).json({
      error: err.message
    });
  }
};


module.exports = {
  createArival,
};
