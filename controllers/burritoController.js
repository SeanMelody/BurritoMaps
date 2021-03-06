const Burrito = require("../models/burritoModels")

module.exports = {
    newBurrito: async (req, res) => {
        // console.log("newBurrito get route working")
        try {
            const newBurrito = new Burrito({
                restaurant: req.body.restaurant,
                burrito: req.body.burrito,
                ranking: req.body.ranking,
                description: req.body.description,
                location: [{ latitude: req.body.location[0].latitude, longitude: req.body.location[0].longitude }],
                authorId: req.user,
            })

            const successSave = await newBurrito.save()
            res.json(successSave)
        } catch (err) {
            res.send("error saving new Burrito: ", err)
        }
        // res.send("success from controller")
    },

    getUserBurritos: async (req, res) => {
        // console.log("getuserBurritos")

        try {
            const allBurritos = await Burrito.find({ authorId: req.user })
            res.json(allBurritos)

        } catch (err) {
            console.log(err)
            res.send("Can not get burritos", err)
        }
    },

    // Get All Burritos!
    getAllBurritos: async (req, res) => {

        try {
            const all = await Burrito.find({})
            res.json(all)
            // console.log(all)
        }
        catch (err) {
            console.log("Not able to get all burritos", err)
        }
    },

}