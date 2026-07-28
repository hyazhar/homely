const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const listingsController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../config/cloudConfig");
const upload = multer({ storage });



// GET /listings
router.get("/",wrapAsync(listingsController.index)
);

// GET /listings/:id
router.get("/:id",wrapAsync(listingsController.showListing)
);

// GET /listings/:id/edit
router.get("/:id/edit",wrapAsync(listingsController.renderEditForm)
);

// PUT /listings/:id
router.put("/:id",upload.single("listing[image]"),wrapAsync(listingsController.updateListing)
);

module.exports = router;