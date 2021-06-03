const mongoose = require("mongoose");
const Burrito = require("./burritoModels")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    displayName: {
        type: String,
        required: true,
    }
})

userSchema.pre("findOneAndDelete", async (user) => {
    try {
        await Burrito.deleteMany({ authorId: user._id })
    } catch (err) {
        console.log(err)
    }

})

module.exports = User = mongoose.model("user", userSchema)