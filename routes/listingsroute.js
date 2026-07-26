const express= require('express');
const router= express.Router();
const ExpressError = require("../utils/ExpressError");
const Listing=require('../models/listingSchema');
// const wrapAsync= require('../utils/wrapAsync');

router.get("/listings",async (req, res) => {
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
});


module.exports=router;