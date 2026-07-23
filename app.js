const express = require("express");
const path = require("path");
const app = express();
const engine= require('ejs-mate');
const ExpressError = require("./utils/ExpressError");
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

// Errr Route
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("error", {statusCode,message});
});
module.exports = app;