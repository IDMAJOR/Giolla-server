const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifiedUserToken = (req, res, next) => {
  const token = req.cookies.user_token;
  console.log("Token: " + token);

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = { verifiedUserToken };
