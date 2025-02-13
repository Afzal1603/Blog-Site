const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = dbConnect;
