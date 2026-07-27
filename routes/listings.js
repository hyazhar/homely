const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const listingsController = require("../controllers/listings");

// GET /listings
router.get(
    "/",
    wrapAsync(listingsController.index)
);

// GET /listings/:id
router.get(
    "/:id",
    wrapAsync(listingsController.showListing)
);

// GET /listings/:id/edit
router.get(
    "/:id/edit",
    wrapAsync(listingsController.renderEditForm)
);

// PUT /listings/:id
router.put(
    "/:id",
    wrapAsync(listingsController.updateListing)
);

module.exports = router;