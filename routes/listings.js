const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const listingsController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../config/cloudConfig");
const upload = multer({ storage });
const {isLoggedIn}= require('../middleware/Isloggedin');
// GET /listings
router.get("/",isLoggedIn,wrapAsync(listingsController.index)
);

// GET /listings/:id
router.get("/:id",isLoggedIn,wrapAsync(listingsController.showListing)
);

// GET /listings/:id/edit
router.get("/:id/edit",isLoggedIn,wrapAsync(listingsController.renderEditForm)
);

// PUT /listings/:id
router.put("/:id",isLoggedIn,upload.single("listing[image]"),wrapAsync(listingsController.updateListing)
);

module.exports = router;