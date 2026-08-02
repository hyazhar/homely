const mongoose = require("mongoose");
const Review= require('./reviewSchema');
const { Schema } = mongoose;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      filename: {
        type: String,
        default: "listingimage",
      },
      url: {
        type: String,
        required: true,
      },
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    // We'll use this after implementing authentication
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    // We'll use this after implementing reviews
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }

});

module.exports = mongoose.model("Listing", listingSchema);