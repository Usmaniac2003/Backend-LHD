const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    category: {
        type: String,
        // required: true
    },
    subcategory: {
        type: String,
        // required: true
    },
    productType: {
        type: String,
        // required: true
    },
    productName: {
        type: String,
        // required: true
    },
    lifeDayFromSaleDay: {
        year: {
            type: Number,
            
        },
        month: {
            type: Number,
           
        },
        weeks: {
            type: Number,
           
        }
    },
    priceReduction: {
        replaceInYear: {
            type: Number,
            default: 0
        },
        perYearDeductPrice: {
            type: Number,
            default: 0
        },
        replaceInMonth: {
            type: Number,
            default: 0
        },
        perMonthDeductPrice: {
            type: Number,
            default: 0
        },
        replaceInWeek: {
            type: Number,
            default: 0
        },
        perWeekDeductPrice: {
            type: Number,
            default: 0
        }
    },
    productPrice:
    {
        type: Number
    },
    adminCommission: {
        type: Number,
        // required: true
    },
    ambassadorCommission: {
        type: Number,
        // required: true
    },
    subAmbassadorCommission: {
        type: Number,
        // required: true
    },
    referralCommission: {
        type: Number,
        // required: true
    },
    retailPrice: {
        type: Number,
        default: null
    },
    productQuantity: {
        type: Number,
        // required: true
    },
    hsCode: {
        type: Number,
        // required: true
    },
    unit: {
        type: String,
        enum: ['Piece', 'Meter', 'Kilogram'],
        // required: true
    },
    qualityOfProduct: {
        type: String,
        enum: ['A+ Grade', 'A Grade', 'B Grade'],
        // required: true
    },
    delivery: {
        local: {
            enabled: {
                type: Boolean,
                default: false
            },
            cashOnDelivery: {
                type: Boolean,
                default: false
            },
            charges: {
                type: Number,
                default: 0
            }
        },
        national: {
            enabled: {
                type: Boolean,
                default: false
            },
            cashOnDelivery: {
                type: Boolean,
                default: false
            },
            charges: {
                type: Number,
                default: 0
            }
        },
        international: {
            enabled: {
                type: Boolean,
                default: false
            },
            cashOnDelivery: {
                type: Boolean,
                default: false
            },
            charges: {
                type: Number,
                default: 0
            }
        }
    },
    madeInCountry: {
        type: String,
    },
    damagePolicy: {
        type: String,
        // required: true
    },
    productDetails: {
        type: String,
        // required: true
    },
    productProductionTime: {
        oneDay: {
            productProductionDay: {
                type: Number,
                // required: true
            }
        },
        oneWeek: {
            productProductionWeek: {
                type: Number,
                // required: true
            }
        },
        oneMonth: {
            productProductionMonth: {
                type: Number,
                // required: true
            }
        }
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productcategoriesrecycling'
    },
    
    image: {
        type: String,
    },
    images: {
        type: [String],
    },
    status:
    {
        type: String, 
        default:"pending"
    },
    seller:{
		type:String,
		required:true
	},
    productionUnit:
    {
        type: String
    }
});

module.exports = mongoose.model('productrecyclingform', productSchema);
