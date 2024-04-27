const mongoose = require("mongoose");

const rackSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    numberOfRacks:
    {
        type: Number,
        required: true,
    },
    rackType:
    {
        type: String,
        enum:['Floor Rack', 'Hanger Rack', 'Shelf Rack']
    },
    rackSize:
    {
        front: { 
            size: { type: Number,
                //  required: true 
                },
            unit: { type: String, enum: ['feet', 'inch', 'meter'], 
            // required: true 
        }
        },
        back: { 
            size: { type: Number, 
                // required: true 
            },
            unit: { type: String, enum: ['feet', 'inch', 'meter'], 
            // required: true 
            }
        },
        height: { 
            size: { type: Number, required: true },
            unit: { type: String, enum: ['feet', 'inch', 'meter'], 
            // required: true 
        }
        }
    },
    type:{
      type:String,
      enum:['owned','rental']  
    },
    qualityController: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qualityController'
    },
});

module.exports = mongoose.model('Rack', rackSchema);