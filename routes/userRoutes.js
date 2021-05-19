const router = require("express").Router();
const { users } = require("../controllers/userController")
const { register, login } = require("../controllers/userController")

// Test route unused later
router.get("/test", (req, res) => {
    res.send("test route")
})

// Base route using "users" path from server.js, and the test from userController
router.get("/", users)

// users/register as a post request to register a new user

router.post("/register", register)

// users/login to get the user
router.post("/login", login)


module.exports = router;