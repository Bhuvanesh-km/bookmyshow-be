const Theatre = require("../models/theatreModel");
const User = require("../models/userModel");

const addTheatre = async (req, res, next) => {
  try {
    const { owner } = req.body;
    const user = await User.findOne({ email: owner });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    const { name, address, phone, email } = req.body;
    const newTheatre = new Theatre({
      name,
      address,
      phone,
      email,
      owner: user._id,
    });
    await newTheatre.save();
    res.send({
      success: true,
      message: "New theatre has been added!",
    });
  } catch (error) {
    next(error);
  }
};

// get all theatres
const getAllTheatres = async (req, res, next) => {
  try {
    const theatres = await Theatre.find().populate("owner", "name email -_id");
    if (!theatres) {
      return res.status(404).send({
        success: false,
        message: "No theatres found!",
      });
    }
    res.send({
      success: true,
      message: "All theatres have been fetched!",
      data: theatres,
    });
  } catch (error) {
    next(error);
  }
};

// get specific theatre by owner (userId)
const getTheatreByOwner = async (req, res, next) => {
  try {
    const theatre = await Theatre.find({ owner: req.userId });
    if (!theatre) {
      return res.status(404).send({
        success: false,
        message: "Theatre not found! for this user",
      });
    }
    res.send({
      success: true,
      message: "Theatre fetched successfully!",
      data: theatre,
    });
  } catch (error) {
    next(error);
  }
};

const updateTheatre = async (req, res, next) => {
  try {
    const { owner } = req.body;
    const user = await User.findOne({ email: owner });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    const { name, address, phone, email } = req.body;
    const updatedTheatre = {
      name,
      address,
      phone,
      email,
      owner: user._id,
    };

    const theatre = await Theatre.findByIdAndUpdate(
      req.params.id,
      updatedTheatre,
      {
        new: true,
      }
    );
    if (!theatre) {
      return res.status(404).send({
        success: false,
        message: "Theatre not found!",
      });
    }
    res.send({
      success: true,
      message: "Theatre updated successfully!",
      data: theatre,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTheatre = async (req, res, next) => {
  try {
    const theatre = await Theatre.findByIdAndDelete(req.params.id);
    if (!theatre) {
      return res.status(404).send({
        success: false,
        message: "Theatre not found!",
      });
    }
    res.send({
      success: true,
      message: "Theatre deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTheatre,
  getAllTheatres,
  getTheatreByOwner,
  updateTheatre,
  deleteTheatre,
};
