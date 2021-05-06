// Required Consts!
const express = require("express");
const app = express();

// const db = require("./models");
// require("dotenv").config();


// Set up for Heroku or Port 5000 cause I'm crazy!
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Let the user know the server is running, and which port.  Yeay!
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});