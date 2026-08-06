const ExpressError = require("../utils/ExpressError");
const { listingSchema,reviewSchema } = require("../schemas");
const Review = require("../models/reviewSchema");
const Listing=require('../models/listingSchema');
// Login Middleware
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in first.");
        return res.redirect("/login");
    }
    next();
};

// Lising Middleware
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {

        const msg = error.details
            .map(el => el.message)
            .join(",");

        throw new ExpressError(400, msg);
    }
    next();
};
// review middleware

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details
            .map(el => el.message)
            .join(",");
        throw new ExpressError(400, msg);
    }

    next();

};
// isowner middleware
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }
    if (!review.owner.equals(req.user._id)) {
        req.flash("error", "You are not authorized to do this!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Please login first.");
        return res.redirect("/login");

    }
    if (req.user.role !== "admin") {

        req.flash("error", "Access Denied!");

        return res.redirect("/");
    }
    next();
};