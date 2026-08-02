const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy=require('passport-local')
const wrapAsync = require("../utils/wrapAsync");
const usersController = require("../controllers/user");
const {isLoggedIn}= require('../middleware/Isloggedin');

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
        usersController.login
    );
router.get("/logout", usersController.logout);

router.get("/dashboard",isLoggedIn,wrapAsync(usersController.dashboard));


module.exports = router;