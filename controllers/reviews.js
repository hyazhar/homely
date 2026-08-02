const Listing = require("../models/listingSchema");
const Review = require("../models/reviewSchema");



module.exports.renderReviewForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    res.render("reviews", { listing });
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