const router = require("express").Router();
const auth = require("../middleware/auth")
const { newBurrito, getUserBurritos, getAllBurritos } = require("../controllers/burritoController")

// Post new burritos
router.post("/", auth, newBurrito)

// Get all the burritos with auth!
router.get("/", auth, getUserBurritos)

// Get all the burritos for development purposes
router.get("/all", getAllBurritos)

// Test to see the burritos
// router.get("/allBurritos", getUserBurritos)

module.exports = router;