const Store = require('../models/store');
const QualityController = require('../models/qualityController')
const bcrypt = require('bcrypt');
const createStore = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const store = new Store({
      brandName: req.body.brandName,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      country: req.body.country,
      city: req.body.city,
      productCategories: req.body.productCategories,
      contactNumber: req.body.contactNumber,
      qualityController:req.body.qualityController

    });
    if(req.file)
    {
       store.image=req.file.path
    }
    await store.save();

    res.status(201).json({
      message: 'Store created successfully',
      store: store
    });
  } catch (err) {
    console.error('Error while creating store:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getStores = async (req, res) => {
  try {
    const qualityControllerId = req.params.id;
    const stores = await Store.find({qualityController: qualityControllerId});
    res.status(200).json(stores);
  } catch (err) {
    console.error('Error while fetching stores:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateStore = async (req, res) => {
  try {
    const { brandName, name, country, city, contactNumber, image } = req.body;
    const updatedStore = await Store.findByIdAndUpdate(req.params.id, { brandName, name, country, city, contactNumber, image }, { new: true });
    res.status(200).json({ message: 'Store updated successfully', store: updatedStore });
  } catch (err) {
    console.error('Error while updating store:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const deleteStore = async (req, res) => {
  try {
    await Store.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Store deleted successfully' });
  } catch (err) {
    console.error('Error while deleting store:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  createStore,
  getStores,
  updateStore,
  deleteStore
};
