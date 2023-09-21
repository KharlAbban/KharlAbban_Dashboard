// Import User Model
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// Import JWT Handler Functions
const { createJWTToken, maxAge } = require("../middleware/jwtFunctions");
const { handleRegisterErrors } = require("../middleware/errorFunctions");

//Route Controllers

function showRegisterPage (req, res) {
    res.render("register");
}

//POST request handler to create new user
async function registerUser (req, res) {
    const {fullname, email, password} = req.body;
    try {
        const user = await User.create({fullname, email, password});
        const token = createJWTToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge:  maxAge*1000});
        res.status(201).json({user: user._id});
    } catch (err) {
        const errors = handleRegisterErrors(err);
        res.json({errorsFound: errors});
    }
}

module.exports = {
    showRegisterPage,
    registerUser
}