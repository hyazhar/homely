const Listing = require("../models/listingSchema");
const Review = require("../models/reviewSchema");
const ExpressError= require('../utils/ExpressError')

module.exports.renderReviewForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    res.render("reviews/reviewsform", { listing });
};

module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const review = new Review(req.body.review);
    review.owner = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success","Review Added!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req,res)=>{
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id,
        {
            $pull:{
                reviews:reviewId
            }
        }
    );
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
};

module.exports.renderEditReviewForm = async (req, res) => {
    const { id, reviewId } = req.params;
    const listing = await Listing.findById(id);
    const review = await Review.findById(reviewId);
    if (!listing || !review) {
        throw new ExpressError(404, "Review Not Found");
    }

    res.render("reviews/edit", {
        listing,
        review,
    });

};
module.exports.updateReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndUpdate(
        reviewId,
        req.body.review,
        {
            new: true,
            runValidators: true,
        }
    );
    req.flash("success", "Review updated successfully!");
    res.redirect(`/listings/${id}`);
};