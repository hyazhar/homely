const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("landingpage");
});

module.exports = app;