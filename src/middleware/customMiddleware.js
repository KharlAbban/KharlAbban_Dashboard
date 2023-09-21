// Import User Model
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

function checkCurrentUser (req, res, next) {
  // get token
  const token = req.cookies.jwt;

  // verify token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
          res.locals.username = null;
          next();
      } else {
          // Valid User, get user details from MongoDB
          let user = await User.findById(decodedToken.id);
          // Pass user into views
          res.locals.username = user;
          next();
      }
  });
  } else {
    res.locals.username = null;
    next();
  }
}

module.exports = {
  checkCurrentUser
}