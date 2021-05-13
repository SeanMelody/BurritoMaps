// Required Consts!
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const path = require("path");
const { isRegExp } = require("util");

// const db = require("./models");
// require("dotenv").config();


// Set up for Heroku or Port 5000 cause I'm crazy!
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Using Mongoose for MongoDB, burrito-eater
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/burrito-eater",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) throw err;
        console.log("connected to mongodb")
    }
);
// More Heroku optimization
if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"))
}

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

// Let the user know the server is running, and which port.  Yeay!
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});