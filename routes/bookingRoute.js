const bookingRouter = require("express").Router();

const { authenticateUser } = require("../middleware/authMiddleware");

bookingRouter.use(authenticateUser);
const {
  createBooking,
  getBookingByUser,
  webhook,
  makePayment,
} = require("../controllers/bookingController");

bookingRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

bookingRouter.post("/payment", makePayment);

bookingRouter.post("/book-show", createBooking);

bookingRouter.get("/", getBookingByUser);

module.exports = bookingRouter;
