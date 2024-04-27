const mongoose = require('mongoose');

const addBaner = mongoose.Schema({
  bannerTitle:
  {
    type: String,
    required: true
  },
   image:
   {
    type: String,
    required:true
   },
   
});

module.exports = mongoose.model('banner', addBaner);
