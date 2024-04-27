const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const sellerSchema = mongoose.Schema({
  yourName: {
    type: String,
    // required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  yourEmail: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    ],
  },
  selectCountry: {
    type: String,
    required: true,
  },
  selectRegion: {
    type: String,
    required: true,
  },
  officialAddress: {
    type: String,
    required: true,
  },
  sellerBio: {
    type: String,
  },
  selectQualityController: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  yourPhone: {
    type: Number,
    required: true,
    maxLength: 10
  },
  createPassword: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    // required: true,
  },
  // selectQualityController: {
  //   type: String,
  //   // required: true,
  // },
  image: {
    type: String,
    
  },
  status:{
    type:String,
  }
  
});

sellerSchema.plugin(uniqueValidator);


module.exports = mongoose.model("seller", sellerSchema);
