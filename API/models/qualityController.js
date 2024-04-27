const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:
  {
    type:String,
    // required: true,
  },
  email:
   {
    type:String,
    // required: true,
  },
  experienceStatus:
   {
    type:String,
    // required: true,
  },
  country:
   {
    type:String,
    // required: true,
  },
  servicePost:
   {
    type:String,
    // required: true,
  },
  gender:
   {
    type:String,
    // required: true,
  },
  profile:
   {
    type:String,
    // required: true,
  }, // This can be a file path or a URL to the image
  phone:
   {
    type:String,
    // required: true,
  },
  youtubeVideoLink:
   {
    type:String,
    // required: true,
  },
  officialAddress:
   {
    type:String,
    // required: true,
  },
  highestQualification:
   {
    type:String,
    // required: true,
  },
  generalSkills:
   [{
    type:String,
    // required: true,
  }], // Can be an array of skills
  previousExperience:
   {
    type:String,
    // required: true,
  },
  cnicFront:
   {
    type:String,
    // required: true,
  }, // This can be a file path or a URL to the image
  cnicBack:
   {
    type:String,
    // required: true,
  },
  cv:
   {
    type:String,
    // required: true,
  }, // This can be a file path or a URL to the CV
  bankAccount:
   {
    type:String,
    // required: true,
  },
  branchCode:
   {
    type:String,
    // required: true,
  },
  mobileAccount:
   {
    type:String,
    // required: true,
  },
  registration:
   {
    type:String,
    // required: true,
  },
  businessLogo:
   {
    type:String,
    // required: true,
  }, // This can be a file path or a URL to the logo
  password:
   {
    type:String,
    // required: true,
  },
  joiningAs:
   {
    type:String,
    // required: true,
  },
  specialSkills:
   [{
    type:String,
    // required: true,
  }], // Can be an array of skills
  region:
   {
    type:String,
    // required: true,
  },
  bankAccountTitle:
   {
    type:String,
    // required: true,
  },
  bankName:
   {
    type:String,
    // required: true,
  },
  mobileAccountTitle:
   {
    type:String,
    // required: true,
  },
  selfDescription:
   {
    type:String,
    // required: true,
  },
  industryInstituteRegistration:
   {
    type:String,
    // required: true,
  },
  sellers:{
    type:[String],
  },
  status:{
    type:String,
  }
});
// Create a model based on the schema
const QualityController = mongoose.model('QualityController', userSchema);

module.exports = QualityController;
