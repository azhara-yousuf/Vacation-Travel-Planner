const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const hbSchema = new Schema({
    mail: String,
    rb:String,
    cin:String,
    cout:String,
    name: String, 
    price:String,
    location:String
});
module.exports = mongoose.model('hotelb', hbSchema);