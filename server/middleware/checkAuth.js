const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return next(errorHandler(400, "Unauthorised User"));
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return next(errorHandler(400, error.message));
  }
};

module.exports = checkAuth;
