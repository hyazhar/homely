const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const listingsController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../config/cloudConfig");
const upload = multer({ storage });
const {isLoggedIn,isOwner}= require('../middleware/Isloggedin');
const {validateListing}= require('../middleware/Isloggedin');



// GET /listings
router.get("/",isLoggedIn,wrapAsync(listingsController.index)
);

// CREATE Listings
router.get('/new',isLoggedIn,wrapAsync(listingsController.renderCreatelisting));
router.post('/',isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingsController.createListing))

// GET /listings/:id
router.get("/:id",isLoggedIn,wrapAsync(listingsController.showListing)
);

// GET /listings/:id/edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingsController.renderEditForm)
);

// PUT /listings/:id
router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingsController.updateListing)
);

router.delete("/:id",
        isLoggedIn,isOwner,
        wrapAsync(listingsController.destroyListing)
    );
module.exports = router;