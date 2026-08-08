const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy=require('passport-local')
const wrapAsync = require("../utils/wrapAsync");
const usersController = require("../controllers/user");
const {isLoggedIn,saveRedirectUrl}= require('../middleware/Isloggedin');
const multer = require("multer");
const { storage } = require("../config/cloudConfig");
const upload = multer({ storage });

router.get("/profile",isLoggedIn,wrapAsync(usersController.renderProfile));
router.get( "/profile/edit",isLoggedIn,wrapAsync(usersController.renderEditProfile)
);
// Update Profile
router.put("/profile",isLoggedIn,upload.single("avatar"),wrapAsync(usersController.updateProfile));
router.delete("/profile",isLoggedIn,wrapAsync(usersController.deleteAccount));


router.route("/signup")
    .get(usersController.renderSignupForm)
    .post(wrapAsync(usersController.signup));

router.route("/login")
    .get(usersController.renderLoginForm)
    .post(
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        saveRedirectUrl,
        usersController.login
    );
router.get("/logout", usersController.logout);

router.get("/dashboard",isLoggedIn,wrapAsync(usersController.dashboard));
router.post("/profile/apply-host",isLoggedIn,wrapAsync(usersController.applyForHost)
);

module.exports = router;