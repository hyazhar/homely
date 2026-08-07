const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const adminController = require("../controllers/admin");
const { isLoggedIn,isAdmin } = require("../middleware/Isloggedin");


router.use(isLoggedIn, isAdmin);

// Dashboard
router.get("/", wrapAsync(adminController.dashboard));

// Users
router.get("/users", wrapAsync(adminController.users));

// Listings
router.get("/listings", wrapAsync(adminController.listings));

// Reviews
router.get("/reviews", wrapAsync(adminController.reviews));

// Delete User
router.delete("/users/:id", wrapAsync(adminController.deleteUser));

// Delete Listing
router.delete("/listings/:id", wrapAsync(adminController.deleteListing));

// Delete Review
router.delete("/reviews/:id", wrapAsync(adminController.deleteReview));

module.exports = router;