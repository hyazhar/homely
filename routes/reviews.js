const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware/Isloggedin");
const reviewsController = require("../controllers/reviews");

router.get("/new",isLoggedIn,
    wrapAsync(reviewsController.renderReviewForm)
);
router.post(
    "/",
    isLoggedIn,
    wrapAsync(reviewsController.createReview)
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    wrapAsync(reviewsController.destroyReview)
);

module.exports = router;