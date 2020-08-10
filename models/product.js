 // SETUP
 
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;


 // PRODUCTS

 var productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    imagePath: {type: String, required: true},
    price: {
        type: Number,
        required: true},
    categories: [{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            validate: {
                validator: function(v) {
                    return FKHelper(mongoose.model('Category'), v);
                },
                message: `Category doesn't exist`
            }
    }],
    available: {
        type: Boolean,
        default: true,
    },
    descriptionPath: {
        type: String,
        required: false,
    },
    slug: {
        type: String,
        required: true,
    }
 });

 module.exports = mongoose.model('Product', productSchema);