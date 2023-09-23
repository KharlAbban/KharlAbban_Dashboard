const express = require("express");
const indexRouter = express.Router();
const userRouter = require("./userRoute");
const indexController = require("../controllers/indexController");
const { requiresAuth } = require("../middleware/jwtFunctions");
const { checkCurrentUser } = require("../middleware/customMiddleware");

indexRouter.use("/users", userRouter);
indexRouter.use(express.json());
indexRouter.use(requiresAuth);

indexRouter.get("*", checkCurrentUser);
indexRouter.get("/", indexController.showDashboard);

// Middleware
// function requiresAuth (req, res, next) {
//   console.log(req.cookies);
//   next();
// }

module.exports = indexRouter;

// The layout of the project is diffficult to debug
// Because I use requiresAuth on all / paths, even /login needs a jwt before it opens
//Same thing with /register
//I will change the layout and use requiresAuth on all home page routes, i,.e /home
//So that requiresAuth only affects all /home/something routes and
// all /login , etc routes are not affected

// Also research on effective, fullstack folder management, nodejs