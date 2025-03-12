const jwt = require("jsonwebtoken");
const setToken = (res, data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });
  return token;
};

module.exports = setToken;
