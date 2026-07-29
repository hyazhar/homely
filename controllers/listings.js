const Listing = require("../models/listingSchema");
const ExpressError = require("../utils/ExpressError");

// GET /listings
module.exports.index = async (req, res) => {
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
    res.render("explorelisting", {
        listings,
        search
    });
};

// GET /listings/:id
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    const relatedListings = await Listing.find({
        country: listing.country,
        _id: { $ne: listing._id }
    }).limit(3);
    res.render("show", {
        listing,
        relatedListings
    });
};

// GET /listings/:id/edit
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    res.render("edit", {
        listing
    });

};
// PUT /listings/:id
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        {
            new: true,
            runValidators: true
        }
    );
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    req.flash("success", "Listing Edited successfully!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    req.flash("success", "Listing deleted successfully.");
    res.redirect("/listings");
};