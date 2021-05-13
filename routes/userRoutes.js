const router = require("express").Router();
const { users } = require("../controllers/userController")
const { register } = require("../controllers/userController")

// Test route unused later
router.get("/test", (req, res) => {
    res.send("test route")
})

// Base route using "users" path from server.js, and the test from userController
router.get("/", users)

router.post("/register", register)


module.exports = router;