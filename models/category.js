// SETUP

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 



 // CATEGORIES FOR PRODUCTS

 var categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }, 
    priority: {
        type: Number,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: false,
    }
});

module.exports = mongoose.model('Category', categorySchema);