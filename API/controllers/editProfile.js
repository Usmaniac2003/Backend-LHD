const Profile = require('../models/editProfile');
const QualityController = require('../models/qualityController')
const createProfile = async (req, res) => {
  try {
   
    const profile = new Profile({
      name: req.body.name,
      email: req.body.email,
      sellerBio: req.body.sellerBio,
      qualityController:req.body.qualityController
    });
    if (req.file) {
        profile.image = req.file.path;
    }


    await profile.save();

    res.status(201).json({
      message: 'Profile created successfully',
      profile: profile
    });
  } catch (err) {
    console.error('Error while creating profile:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getProfiles = async (req, res) => {
  try {
    const qualityControllerId = req.params.id;
    const profiles = await Profile.find({ qualityController: qualityControllerId });
    res.status(200).json(profiles);
  } catch (err) {
    console.error('Error while fetching profiles:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateProfile = async (req, res) => {
    try {
      const { name, email, sellerBio, image} = req.body;
    
      const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, { name, email, sellerBio, image }, { new: true });
      res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (err) {
      console.error('Error while updating profile:', err);
      res.status(500).json({
        error: err.message
      });
    }
  };
  
const deleteProfile = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Error while deleting profile:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile
};
