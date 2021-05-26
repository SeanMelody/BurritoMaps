const Burrito = require("../models/burritoModels")

module.exports = {
    newBurrito: async (req, res) => {
        console.log("newBurrito get route working")
        res.send("success from controller")
    }
}