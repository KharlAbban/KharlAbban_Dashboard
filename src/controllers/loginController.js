// Import User Model
const User = require("../models/userModel");
const { createJWTToken, maxAge } = require("../middleware/jwtFunctions");
const { handleLoginErrors } = require("../middleware/errorFunctions");

function showLoginPage (req, res) {
    res.render("login");
}

async function loginUser (req, res) {
  const {email, password} = req.body;
  
  try {
    const user = await User.loginUser(email, password);
    const token = createJWTToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge*1000 });
    res.status(200).json({user: user._id});
  } catch (err) {
    const errors = handleLoginErrors(err);
    res.status(400).json({errorsFound: errors});
  }
}

module.exports = {
  showLoginPage,
  loginUser
};