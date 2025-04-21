const showRoute = require("express").Router();

const {
  addShow,
  getAllShowsByTheterId,
  getAllShows,
  updateShow,
  deleteShow,
  getShowById,
  getAllTheatreByMovie,
} = require("../controllers/showController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

showRoute.use(authMiddleware);

showRoute.post("/", isAdmin, addShow);
showRoute.get("/", getAllTheatreByMovie);
showRoute.get("theatre/:id", getAllShowsByTheterId);
showRoute.get("/", getAllShows);
showRoute.put("/:id", updateShow);
showRoute.delete("/:id", deleteShow);
showRoute.get("/:id", getShowById);

module.exports = showRoute;
