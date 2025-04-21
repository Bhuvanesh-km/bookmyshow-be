const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    const verifiedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verifiedtoken) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    const userId = verifiedtoken.userId;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

const isAdmin = async function (req, res, next) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    if (user.role !== "admin") {
      return res.status(403).send({ success: false, message: "Forbidden" });
    }
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};

module.exports = { authMiddleware, isAdmin };
