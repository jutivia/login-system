require("dotenv").config();
const { UnAuthenticated } = require("../errors/index");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnAuthenticated("No valid token provided");
  }

  const token = authorization.split(" ")[1];
  try {
    const {id, username } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { username, id };
  } catch (error) {
    throw new UnAuthenticated("Not authorized to access this route");
  }

  next();
};
module.exports = authMiddleware;
