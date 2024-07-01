const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const trainSchema = new Schema({
    name: String,
    dept:String,
    arr:String,
    hour:String,
    price: String, 
    tnum:String,
    seats:Number
});

module.exports = mongoose.model('train', trainSchema);