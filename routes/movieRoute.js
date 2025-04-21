const express = require("express");

const movieRouter = express.Router();
const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
} = require("../controllers/movieController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

movieRouter.post("/", authMiddleware, isAdmin, addMovie);

movieRouter.get("/", getAllMovies);

movieRouter.put("/:id", updateMovie);

movieRouter.delete("/:id", deleteMovie);

movieRouter.get("/:id", getMovieById);

module.exports = movieRouter;
