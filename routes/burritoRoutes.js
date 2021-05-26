const router = require("express").Router();
const auth = require("../middleware/auth")
const { newBurrito, getUserBurritos, getAllBurritos } = require("../controllers/burritoController")

// Post new burritos
router.post("/", auth, newBurrito)

// Get all the burritos!
router.get("/", auth, getUserBurritos)


router.get("/all", getAllBurritos)

// Test to see the burritos
// router.get("/allBurritos", getUserBurritos)

module.exports = router;