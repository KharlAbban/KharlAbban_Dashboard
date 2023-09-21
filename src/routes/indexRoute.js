const express = require('express');
const indexRouter = express.Router();
const cookieParser = require("cookie-parser");
const indexController = require("../controllers/indexController");
const { requiresAuth } = require("../middleware/jwtFunctions");
const { checkCurrentUser } = require("../middleware/customMiddleware");

indexRouter.use(express.json());
indexRouter.use(cookieParser());

indexRouter.get("*", checkCurrentUser);
indexRouter.get("/", requiresAuth, indexController.showDashboard);


module.exports = indexRouter;