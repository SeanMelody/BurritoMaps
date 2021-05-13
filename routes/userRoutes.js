const router = require("express").Router();

router.get("/test", (req, res) => {
    res.send("test route")
})

// Base route using "users" path from server.js
router.get("/", (req, res) => {
    res.send("connected")
})

module.exports = router;