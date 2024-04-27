const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")
const sellerPackage  = mongoose.Schema({ 
  title:{
    type: String,
    required: true,
  },
  storeCharges:{
    type: String,
    required: true,
  },
  packageName:{
    type: String,
    required: true,
  },
  minimumStoreCreated:{
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
});
sellerPackage.plugin(uniqueValidator);
module.exports = mongoose.model("sellerPackage", sellerPackage);
