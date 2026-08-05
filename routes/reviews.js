const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn,validateReview,isReviewAuthor } = require("../middleware/Isloggedin");
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
    isLoggedIn,isReviewAuthor,
    wrapAsync(reviewsController.destroyReview)
);

router.get(
    "/:reviewId/edit",
    isLoggedIn,isReviewAuthor,
    wrapAsync(reviewsController.renderEditReviewForm)
);

// Update Review
router.put(
    "/:reviewId",
    isLoggedIn,isReviewAuthor,
    wrapAsync(reviewsController.updateReview)
);


module.exports = router;