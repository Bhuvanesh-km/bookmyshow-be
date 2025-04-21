const express = require("express");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const connectDB = require("./config/db-config");

// Import routes
const userRouter = require("./routes/userRouter");
const movieRouter = require("./routes/movieRoute");
const theatreRouter = require("./routes/theatreRoute");
const showRouter = require("./routes/showRoute");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the BookMyshow API",
  });
});

//centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
