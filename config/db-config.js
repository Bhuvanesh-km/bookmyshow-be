const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db_URI = process.env.DB_URL;
    const db_password = process.env.DB_PASSWORD;
    if (!db_URI) {
      console.error("Database URL not provided in environment variables");
      process.exit(1);
    }
    if (!db_password) {
      console.error("Database password not provided in environment variables");
      process.exit(1);
    }
    const MONGO_URI = db_URI.replace(
      "<db_password>",
      encodeURIComponent(process.env.DB_PASSWORD)
    );
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
