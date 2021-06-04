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
    },
    confirmed: {
        type: Boolean,
        default: false
    },
})

userSchema.post("findOneAndDelete", async (user) => {
    console.log(user)
    try {
        await Burrito.deleteMany({ authorId: user._id })
        console.log("find and delete")
    } catch (err) {
        console.log(err)
    }

})

module.exports = User = mongoose.model("user", userSchema)