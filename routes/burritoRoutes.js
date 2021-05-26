const router = require("express").Router();
const auth = require("../middleware/auth")
const { newBurrito, getUserBurritos } = require("../controllers/burritoController")

// Post all the burritos
router.post("/", auth, newBurrito)

// Get all the burritos!
router.get("/", auth, getUserBurritos)


// Test to see the burritos
// router.get("/allBurritos", getUserBurritos)

module.exports = router;