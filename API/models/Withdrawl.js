const mongoose = require("mongoose");
const Withdrawl = new mongoose.Schema({
    withdrawAmount:{
        required: true,
        type: Number,
    },
    bankAccountNumber:{
        required: true,
        type: String,
    },
    bankAccountName:{
        required: true,
        type: String,
    },
    accountHolderName:{
        required: true,
        type: String,
    },
    qualityController: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qualityController'
    },
    status:{
        required:true,
        type:String
    }
})
module.exports = mongoose.model('Withdrawl', Withdrawl);