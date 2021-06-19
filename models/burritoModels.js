const mongoose = require("mongoose");

// function isLatitude(maybeLat) {
//     var latF = parseFloat(maybeLat);
//     if (isNaN(latF)) return false;
//     return latF >= -90 && latF <= 90;
// }
// // Check the longitude 
// function isLongitude(maybeLon) {
//     var lonF = parseFloat(maybeLon);
//     if (isNaN(lonF)) return false;
//     return lonF >= -180 && lonF <= 180;
// }

const burritoSchema = new mongoose.Schema({
    restaurant: {
        type: String,
        required: true,
    },
    burrito: {
        type: String,
        required: true,
    },
    ranking: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    location: [
        {
            latitude: {
                type: Number,
                // validate: isLatitude,
                // required: [true, "You must enter a latitude."],
            },
            longitude: {
                type: Number,
                // validate: isLongitude,
                // required: [true, "You must enter a longitude."],
            },
        },
    ],
    authorId: {
        type: String,
        required: true,
    }
})


module.exports = Burrito = mongoose.model("burrito", burritoSchema)