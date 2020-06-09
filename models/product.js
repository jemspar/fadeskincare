 // SETUP
 
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;


 // PRODUCTS

 var productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: {type: String, required: true},
    price: {
        type: Number,
        required: true},
    categories: [{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            validate: {
                validator: function(v) {
                    return FKHelper(mongoose.model('Tag'), v);
                },
                message: `Tag doesn't exist`
            }
    }],
    available: {
        type: Boolean,
        default: true,
    },
 });

 module.exports = mongoose.model('Product', productSchema);