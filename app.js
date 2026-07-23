const express = require("express");
const path = require("path");
const app = express();
const engine= require('ejs-mate');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("views", path.join(__dirname, "views"));
app.engine("ejs",engine);
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("landingpage");
});


module.exports = app;