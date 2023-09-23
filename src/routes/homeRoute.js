const express = require("express");
const homeRouter = express.Router();
const expressLayouts = require("express-ejs-layouts");
const homeController = require("../controllers/homeController");
const { requiresAuth } = require("../middleware/jwtFunctions");
const { checkCurrentUser } = require("../middleware/customMiddleware");

homeRouter.use(expressLayouts);
homeRouter.use(express.json());
homeRouter.use(requiresAuth);

homeRouter.get("*", checkCurrentUser);
homeRouter.get("/", homeController.showDashboard);

module.exports = homeRouter;