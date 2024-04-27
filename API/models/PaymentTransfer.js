const mongoose=require('mongoose');
const PaymentTransfer=mongoose.Schema({
    receiverID:{
        type: String,
        required: true
    },
    transferAmount:{
        type: String,
        required: true
    },
    qualityController: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qualityController'
    }
})

module.exports =mongoose.model('PaymentTransfer', PaymentTransfer);