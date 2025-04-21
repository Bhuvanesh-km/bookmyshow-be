const Movie = require("../models/movieModel");

const addMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "New movie has been added!",
    });
  } catch (error) {
    next(error);
  }
};

const getAllMovies = async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: "All movies have been fetched!",
      data: allMovies,
    });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findByIdAndUpdate(movieId, req.body, {
      new: true,
    });
    if (!movie) {
      return res.status(404).send({
        success: false,
        message: "Movie not found",
      });
    }
    res.send({
      success: true,
      message: "Movie has been updated!",
      data: movie,
    });
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.movieId);
    if (!movie) {
      return res.status(404).send({
        success: false,
        message: "Movie not found",
      });
    }
    res.send({
      success: true,
      message: "The movie has been deleted!",
    });
  } catch (err) {
    next(err);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send({
      success: true,
      message: "Movie fetched successfully!",
      data: movie,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
};
