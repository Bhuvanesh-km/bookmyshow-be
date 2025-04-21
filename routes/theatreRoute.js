const TheatreRouter = require("express").Router();

const {
  addTheatre,
  getAllTheatres,
  getTheatreByOwner,
  updateTheatre,
  deleteTheatre,
} = require("../controllers/theatreController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

TheatreRouter.use(authMiddleware);

TheatreRouter.post("/", isAdmin, addTheatre);
TheatreRouter.get("/", getAllTheatres);
TheatreRouter.put("/:id", isAdmin, updateTheatre);
TheatreRouter.delete("/:id", deleteTheatre);
TheatreRouter.get("/owner", getTheatreByOwner);

module.exports = TheatreRouter;
