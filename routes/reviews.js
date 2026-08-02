const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn,validateReview } = require("../middleware/Isloggedin");
const reviewsController = require("../controllers/reviews");


router.get("/new",isLoggedIn,
    wrapAsync(reviewsController.renderReviewForm)
);

router.post(
    "/",
    isLoggedIn,validateReview,
    wrapAsync(reviewsController.createReview)
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    wrapAsync(reviewsController.destroyReview)
);

router.get(
    "/:reviewId/edit",
    isLoggedIn,
    wrapAsync(reviewsController.renderEditReviewForm)
);

// Update Review
router.put(
    "/:reviewId",
    isLoggedIn,
    wrapAsync(reviewsController.updateReview)
);


module.exports = router;