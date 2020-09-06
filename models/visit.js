 // SETUP
 
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 // VISIT

 var visitSchema = new Schema({

     ip: {type: String, required: false },
     src: {type:String,  required: true },
     date: {type: Date, required: true },

 });

 module.exports = mongoose.model('Visit', visitSchema);