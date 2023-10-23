const express = require("express");
const homeRouter = express.Router();
const recipeRouter = require("./subroutes/recipeRoute");
const expressLayouts = require("express-ejs-layouts");
const homeController = require("../controllers/homeController");
const { requiresAuth } = require("../middleware/jwtFunctions");
const { checkCurrentUser } = require("../middleware/customMiddleware");

homeRouter.use(expressLayouts);
homeRouter.use(express.json());
homeRouter.use(requiresAuth);
homeRouter.use("/recipes", recipeRouter);

homeRouter.get("*", checkCurrentUser);
homeRouter.get("/", homeController.showDashboard);

homeRouter.get("*", (req, res) => {
    res.render("errors/home_404");
});

module.exports = homeRouter;