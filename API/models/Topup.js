const mongoose=require('mongoose');
const Topup=mongoose.Schema({
    accountNumber:{
        type: String,
        required: true
    },
    accountHolderName:{
        type: String,
        required: true
    },
    bankName:{
        type:String,
        required: true
    },
    transactionID:{
        type: String,
        required: true
    },
    amountToTopUp:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        required: true,
    },
    qualityController: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qualityController'
    }
})

module.exports =mongoose.model('Topup', Topup);