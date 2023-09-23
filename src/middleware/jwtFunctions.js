if (process.env.NODE_ENV !== "production") require("dotenv").config()
// Import jwt
const jwt = require("jsonwebtoken");
const maxAge = 3*24*60*60;

// JWT Handler Functions
// JWT Creation Function
function createJWTToken (id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

// Function to check and authenticate JWT
function requiresAuth(req, res, next) {
    if (req.cookies) {console.log(req.cookies);}
    // if (!req.cookies) res.redirect("/login");
    // // Grab token from cookie
    // const token = req.cookies.jwt;

    // // Check if token exists and validate
    // if (token) {
    //     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    //         if (err) {
    //             res.redirect("/login");
    //         } else {
    //             next();
    //         }
    //     });
    // } else {
    //     res.redirect("/login");
    // }
}

module.exports = {
    createJWTToken,
    maxAge,
    requiresAuth,
}