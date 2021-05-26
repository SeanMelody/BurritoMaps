const router = require("express").Router();
const auth = require("../middleware/auth")
const { newBurrito } = require("../controllers/burritoController")

// Get all the burritos!
router.get("/", auth, newBurrito)

router.post("/", auth, newBurrito)

module.exports = router;