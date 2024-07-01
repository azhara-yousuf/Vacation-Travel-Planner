var mongoose = require('mongoose');

var hotelSchema = new mongoose.Schema({
    name: String,
    features: String,
    desc : String,
    location: String,
    rating: String, 
    price: String,
    roomcount:Number, 
    img: {
        data: Buffer,
        contentType: String
    },
    img1: {
        data: Buffer,
        contentType: String
    },
    img2: {
        data: Buffer,
        contentType: String
    },
    img3: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Hotel', hotelSchema);
