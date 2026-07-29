const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: String,
        enum: ["user", "host"],
        default: "user",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// Adds username, hash, salt, authenticate(), register(), etc.
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);