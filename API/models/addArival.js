const mongoose = require('mongoose');

const addArrival = mongoose.Schema({
   name:
   {
    type: String,
    required:true
   },
   date:
   {
    type: String,
    required:true
   },
   arrivalDetail:
   {
    type: String,
    required:true
   },
   featured:
   {
    type:String,
    required:true
   },
  status:
   {
    type: String,
    enum:['Active','Inactive'],
    required:true
   }, 
   
   image:
   {
    type: String,
    required:true
   },
   
});

module.exports = mongoose.model('addarival', addArrival);
