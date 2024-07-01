const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const flightSchema = new Schema({
    num:String,
    name: String,
    code:String,
    dept:String,
    arr:String,
    hour:String,
    price: String,
    seats:String, 
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('flight', flightSchema);