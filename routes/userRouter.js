const express = require("express");

const userRouter = express.Router();

const {
  registerUser,
  loginUser,
  getUserById,
} = require("../controllers/userController");

const { authMiddleware } = require("../middlewares/authMiddleware");

// // Route to register a new user
userRouter.post("/register", registerUser);

// // Route to login a user
userRouter.post("/login", loginUser);

// // Route to get user details by ID
userRouter.get("/get-current-user", authMiddleware, getUserById);

// userRouter.patch("/forgot-password", )

// userRouter.patch("/reset-password", )

module.exports = userRouter;
