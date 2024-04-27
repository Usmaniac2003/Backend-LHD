const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")
const ambassadorPackage  = mongoose.Schema({ 
  // _id:mongoose.Schema.Types.ObjectId,
  title:{
    type: String,
    required: true,
  },
  storeCharges:{
    type: String,
    required: true,
  },
  mainStockCharges:{
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
ambassadorPackage.plugin(uniqueValidator);
module.exports = mongoose.model("ambassadorPackage", ambassadorPackage);
