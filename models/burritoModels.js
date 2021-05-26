const mongoose = require("mongoose");

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
    authorID: {
        type: String,
        required: true,
    }
})


module.exports = Burrito = mongoose.model("burrito", burritoSchema)