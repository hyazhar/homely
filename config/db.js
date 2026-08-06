const mongoose = require("mongoose");
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(" Database Connection Failed");
        console.error(err.message);
        process.exit(1); // Exit the process if the DB connection fails
    }
}
module.exports = connectDB;