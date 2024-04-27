const Banner = require('../models/banner');

const createBanner = async (req, res) => {
  try {
    const imageData = req.files.image.map(file => '/image/' + file.filename);
    const banner = new Banner({
      bannerTitle: req.body.bannerTitle,
      image: imageData[0],
    });

    await banner.save();

    res.status(201).json({
      message: 'Banner created successfully',
      banner: banner
    });
  } catch (err) {
    console.error('Error while creating banner:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (err) {
    console.error('Error while fetching banners:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

const updateBanner = async (req, res) => {
    try {
      const { bannerTitle, image} = req.body;
    
      const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, { bannerTitle,image }, { new: true });
      res.status(200).json({ message: 'Banner updated successfully', banner: updatedBanner });
    } catch (err) {
      console.error('Error while updating banner:', err);
      res.status(500).json({
        error: err.message
      });
    }
  };
  
const deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (err) {
    console.error('Error while deleting banner:', err);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner
};
