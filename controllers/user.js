const User = require("../models/userSchema");

module.exports.renderSignupForm = (req, res) => {
    res.render("signup");
};

module.exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
    });
    await User.register(user, password);
    req.flash("success", "Welcome to Homely!");
    res.redirect("/listings");
};

module.exports.renderLoginForm = (req, res) => {
    res.render("login");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings");
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully.");
        res.redirect("/");
    });
};