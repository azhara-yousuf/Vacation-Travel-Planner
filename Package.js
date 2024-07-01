var mongoose = require('mongoose');

var packageSchema = new mongoose.Schema({
    name: String,
    from:String,
    to:String,
    days:Number,
    nights:Number,
    limit:Number,
    highlights: String,
    desc : String,
    rating: String, 
    price: String,
    inc:String,
    exc:String,
    start:Date,
    dayplans:[String],
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
    },
    img4: {
        data: Buffer,
        contentType: String
    },
    img5: {
        data: Buffer,
        contentType: String
    },
    img6: {
        data: Buffer,
        contentType: String
    },
    img7: {
        data: Buffer,
        contentType: String
    },
    img8: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Package', packageSchema);
