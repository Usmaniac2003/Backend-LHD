const mongoose=require('mongoose');
const warehouse=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    width:{
        type: Number,
        required: true
    },
    height:{
        type: Number,
        required: true
    },
    stockcapacity:{
        type:Number,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        default: 'pending',
    },
    qualityController: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qualityController'
    }
})

module.exports =mongoose.model('Warehouse', warehouse);