const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const sampleData = require("./data");
const Listing = require("../models/listingSchema");
const connectDB = require("../config/db");

async function seedData() {
  try {
    await connectDB();
    await Listing.deleteMany({});
    await Listing.insertMany(sampleData);
    console.log("Data seeded successfully!");
  } catch (err) {
    console.error("Data Seeding Failed:", err);
  } finally {
    process.exit();
  }
}
seedData();