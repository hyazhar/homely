const User = require("../models/userSchema");
const Listing = require("../models/listingSchema");
const Review = require("../models/reviewSchema");

module.exports.dashboard = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalReviews = await Review.countDocuments();
    const recentUsers = await User.find()
        .sort({ createdAt: -1 })
        .limit(5);
    const recentListings = await Listing.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("owner");
    res.render("admin/dashboard", {
        totalUsers,
        totalListings,
        totalReviews,
        recentUsers,
        recentListings,

    });

};

module.exports.users = async (req, res) => {

    const users = await User.find();

    res.render("admin/users", { users });

};

module.exports.listings = async (req, res) => {

    const listings = await Listing.find()
        .populate("owner");

    res.render("admin/listings", { listings });

};

module.exports.reviews = async (req, res) => {

    const reviews = await Review.find()
        .populate("owner");

    res.render("admin/reviews", { reviews });

};

module.exports.deleteUser = async (req, res) => {

    await User.findByIdAndDelete(req.params.id);

    req.flash("success", "User deleted.");

    res.redirect("/admin/users");

};

module.exports.deleteListing = async (req, res) => {

    await Listing.findByIdAndDelete(req.params.id);

    req.flash("success", "Listing deleted.");

    res.redirect("/admin/listings");

};

module.exports.deleteReview = async (req, res) => {

    await Review.findByIdAndDelete(req.params.id);

    req.flash("success", "Review deleted.");

    res.redirect("/admin/reviews");

};

module.exports.hostApplications = async (req, res) => {
    const users = await User.find({
        role: "user",
        "hostApplication.status": "pending"
    }).sort({
        "hostApplication.appliedAt": -1
    });

    res.render("admin/hostApplications", {users });
};

module.exports.approveHost = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        req.flash("error", "User not found.");
        return res.redirect("/admin/host-applications");
    }
    if (user.role !== "user") {
        req.flash("error", "This user cannot be approved.");
        return res.redirect("/admin/host-applications");
    }
    user.role = "host";
    user.hostApplication.status = "approved";
    await user.save();
    req.flash(
        "success",
        `${user.username} is now a host.`
    );

    res.redirect("/admin/host-applications");
};

module.exports.rejectHost = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        req.flash("error", "User not found.");
        return res.redirect("/admin/host-applications");
    }
    user.hostApplication.status = "rejected";
    await user.save();
    req.flash(
        "success",
        `${user.username}'s host application was rejected.`
    );
    res.redirect("/admin/host-applications");
};
