const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;
const Listing= require('./listingSchema');
const Review= require('./reviewSchema');
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        role: {
            type: String,
            enum: ["user", "host"],
            default: "user",
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        location: {
            type: String,
            trim: true,
            default: "",
        },

        bio: {
            type: String,
            maxlength: 300,
            trim: true,
            default: "",
        },

        avatar: {
            filename: {
                type: String,
                default: "default-avatar",
            },

            url: {
                type: String,
                default:
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            },
        },
    },
    {
        timestamps: true,
    }
);
userSchema.post("findOneAndDelete", async (user) => {
    if (!user) return;
    // Delete all reviews by the user
    const reviews = await Review.find({
        owner: user._id
    });
    const reviewIds = reviews.map(r => r._id);
    await Listing.updateMany(
        {},
        {
            $pull: {
                reviews: {
                    $in: reviewIds
                }
            }
        }
    );

    await Review.deleteMany({
        owner: user._id
    });

    // Delete listings
    await Listing.deleteMany({
        owner: user._id
    });

});

// Adds username, hash, salt, authenticate(), register(), etc.
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);