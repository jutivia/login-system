require("dotenv").config();
const customError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new customError("No valid token provided", 401);
  }

  const token = authorization.split(" ")[1];
  try {
    const {id, username } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { username, id };
  } catch (error) {
    throw new customError("Not authorized to access this route", 401);
  }

  next();
};
module.exports = authMiddleware;
