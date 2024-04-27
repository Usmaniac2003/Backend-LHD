const mongoose = require('mongoose');

const addProduct = mongoose.Schema({
 title:
 {
    type:String,
    required:true
 },
 date:
 {
    type:Number,
    required:true
 },
 opportunityDetails:
 {
    type:String,
    required:true
 },
 status:
 {
    type:String,
    enum:['active','inactive'],
    required:true
 },
 image:
 {
    type:String
 },
 qualityController:
{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
}
   
});

module.exports = mongoose.model('buisnessopprotunitiesproducts', addProduct);
