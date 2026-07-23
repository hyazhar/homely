const path= require('path');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const sampledata= require('./data');
const mongoose=require('mongoose');
const Listing=require('../models/listingSchema');
const connectDB= require('../config/db');
connectDB();
