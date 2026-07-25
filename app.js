const express = require("express");
const path = require("path");
const app = express();
const engine= require('ejs-mate');
const ExpressError = require("./utils/ExpressError");
const Listing=require('./models/listingSchema');
const wrapAsync= require('./utils/wrapAsync');

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

app.get("/listings", wrapAsync(async (req, res) => {
    const search = req.query.search;
    let listings;
    if (search) {
        listings = await Listing.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        });
    } else {
        listings = await Listing.find({});
    }
    res.render("explorelisting", { listings, search });
}));

app.get("/listings/:id", wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
          if (!listing) {
            throw new ExpressError(404, "Listing Not Found");
        }
        const relatedListings = await Listing.find({
                country: listing.country,
                 _id: { $ne: listing._id }
                }).limit(3);
        res.render("show", { listing , relatedListings});
}));

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