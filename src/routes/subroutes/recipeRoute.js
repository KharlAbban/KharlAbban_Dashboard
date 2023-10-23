const express = require("express");
const recipeRouter = express.Router();
const expressLayouts = require("express-ejs-layouts");
const recipeController = require("../../controllers/subcontrollers/recipeController");

recipeRouter.use(expressLayouts);
recipeRouter.use(express.json());

recipeRouter.get("/", recipeController.showHomepage);
recipeRouter.get("/categories", recipeController.showCategories);
recipeRouter.get("/categories/:categoryName", recipeController.showCategoryDetails);
recipeRouter.get("/recipe/:recipeId", recipeController.showRecipeDetails);


module.exports = recipeRouter;