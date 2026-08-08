const User = require("../models/userSchema");
const Listing = require("../models/listingSchema");
const Review= require("../models/reviewSchema");

// Profile Route
module.exports.renderProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    const totalListings = await Listing.countDocuments({
        owner: req.user._id,
    });
    const totalReviews = await Review.countDocuments({
        owner: req.user._id,
    });
    res.render("users/profile", {
        user,
        totalListings,
        totalReviews,
    });
};

module.exports.renderEditProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.render("users/editProfile", {user,});
};

module.exports.updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    // Check if username already exists
    if (req.body.username !== user.username) {
        const existingUser = await User.findOne({
            username: req.body.username
        });
        if (existingUser) {
            req.flash("error", "Username already exists.");
            return res.redirect("/profile/edit");
        }
        user.username = req.body.username;
    }
    user.phone = req.body.phone;
    user.location = req.body.location;
    user.bio = req.body.bio;
    if (req.file) {
        user.avatar = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }
    await user.save();
    req.flash("success", "Profile updated successfully!");
    res.redirect("/profile");
};

module.exports.deleteAccount = async (req, res, next) => {
    // Prevent admin from deleting their own account
    if (req.user.role === "admin") {
        req.flash(
            "error",
            "Admin account cannot be deleted."
        );
        return res.redirect("/profile");
    }
    await User.findByIdAndDelete(req.user._id);
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        req.flash(
            "success",
            "Account deleted successfully."
        );
        res.redirect("/");
    });
};

module.exports.renderSignupForm = (req, res) => {
    res.render("signup");
};
module.exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
    });
    const registeredUser= await User.register(user, password);
    req.login(registeredUser,(err)=>{
        if (err){
            return next(err);
        }
        req.flash("success",`Welcome to Homely ${registeredUser.username}`);
        res.redirect("/listings");
    })
};

module.exports.renderLoginForm = (req, res) => {
    res.render("login");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully.");
        res.redirect("/");
    });
}

module.exports.dashboard = async(req, res) => {
    const listings = await Listing.find({
        owner: req.user._id
    });
    res.render("dashboard", {listings});
};

module.exports.applyForHost = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        req.flash("error", "User not found.");
        return res.redirect("/profile");
    }
    if (user.role === "admin") {
        req.flash("error", "Admin cannot apply for host.");
        return res.redirect("/profile");
    }
    if (user.role === "host") {
        req.flash("error", "You are already a host.");
        return res.redirect("/profile");
    }
    if (user.hostApplication.status === "pending") {
        req.flash("error", "Your host application is already pending.");
        return res.redirect("/profile");
    }

    user.hostApplication.status = "pending";
    user.hostApplication.appliedAt = new Date();

    await user.save();

    req.flash(
        "success",
        "Host application submitted successfully!"
    );

    res.redirect("/profile");
};