const User = require("../models/userModels")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

module.exports = {
    users: (req, res) => {
        res.send("Users will go here")
    },
    register: async (req, res) => {

        try {
            // Deconstruct the user object
            const { email, password, passwordCheck, displayName } = req.body
            // Make suer every field is entered
            if (!email || !password || !passwordCheck || !displayName) {
                return res.status(400).json({ msg: "Must enter in all fields" })
            }
            // Make sure password is long enough
            if (password.length < 4) {
                return res.status(400).json({ msg: "Password must be longer then 4 characters" })
            }
            // Make sure password matches PasswordCheck
            if (password !== passwordCheck) {
                return res.status(400).json({ msg: "Password must match" })
            }
            // Make sure only one email is used per user
            const existingUser = await User.findOne({ email: email })

            if (existingUser) {
                return res.status(400).json({ msg: "Must use a different Email" })
            }
            // Defaults to 15 , but can enter 10-20 (more will slow down the system)
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt)

            const newUser = new User({
                email,
                password: passwordHash,
                displayName,
            })

            const savedUser = await newUser.save()
            res.json(savedUser)
        } catch (err) {
            res.status(500).json({ msg: err })
        }

    },
}