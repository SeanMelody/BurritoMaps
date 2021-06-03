const router = require("express").Router();
const auth = require("../middleware/auth")
// const { users } = require("../controllers/userController")
const { register, login, getUser, deleteUser } = require("../controllers/userController")

// Test route unused later
router.get("/test", (req, res) => {
    res.send("test route")
})

// list route using "users" path from server.js, and the test from userController
// router.get("/list", users)

// Authentication to make sure that user is authorized
router.get("/", auth, getUser)

// users/register as a post request to register a new user

router.post("/register", register)

// router/delete to delete the user
router.delete("/", auth, deleteUser)

// users/login to get the user
router.post("/login", login)


module.exports = router;