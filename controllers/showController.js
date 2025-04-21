const Show = require("../models/showModel");

// Add a new show
const addShow = async (req, res, next) => {
  try {
    const newShow = new Show(req.body);

    await newShow.save();

    res.status(201).json({
      message: "Show added successfully",
      show: newShow,
    });
  } catch (error) {
    next(error);
  }
};

// Get all shows by theatre ID
const getAllShowsByTheterId = async (req, res, next) => {
  try {
    const shows = await Show.find({ theatre: req.params.id });

    if (!shows) {
      return res.status(404).json({
        message: "No shows found for this theatre",
      });
    }

    res.status(200).json({
      message: "Shows retrieved successfully",
      shows,
    });
  } catch (error) {
    next(error);
  }
};

// Get all shows
const getAllShows = async (req, res, next) => {
  try {
    const shows = await Show.find();

    if (!shows) {
      return res.status(404).json({
        message: "No shows found",
      });
    }

    res.status(200).json({
      message: "Shows retrieved successfully",
      shows,
    });
  } catch (error) {
    next(error);
  }
};

// Update a show
const updateShow = async (req, res, next) => {
  try {
    const updatedShow = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedShow) {
      return res.status(404).json({
        message: "Show not found",
      });
    }

    res.status(200).json({
      message: "Show updated successfully",
      show: updatedShow,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a show
const deleteShow = async (req, res, next) => {
  try {
    const deletedShow = await Show.findByIdAndDelete(req.params.id);

    if (!deletedShow) {
      return res.status(404).json({
        message: "Show not found",
      });
    }

    res.status(200).json({
      message: "Show deleted successfully",
      show: deletedShow,
    });
  } catch (error) {
    next(error);
  }
};

// Get a show by ID
const getShowById = async (req, res, next) => {
  try {
    const show = await Show.findById(req.params.id);

    if (!show) {
      return res.status(404).json({
        message: "Show not found",
      });
    }

    res.status(200).json({
      message: "Show retrieved successfully",
      show,
    });
  } catch (error) {
    next(error);
  }
};

//get all theatre by movie which has some shows
const getAllTheatreByMovie = async (req, res, next) => {
  try {
    const { movie, date } = req.body;
    // First get all the shows of the selected date
    const shows = await Show.find({ movie, date }).populate("theatre");

    // Filter out the unique theatres now
    let uniqueTheatres = [];
    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );
      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });
    res.send({
      success: true,
      message: "All theatres fetched!",
      data: uniqueTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addShow,
  getAllShowsByTheterId,
  getAllShows,
  updateShow,
  deleteShow,
  getShowById,
  getAllTheatreByMovie,
};
