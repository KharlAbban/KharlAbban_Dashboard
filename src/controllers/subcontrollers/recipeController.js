//Import Recipe-related models
const Category = require("../../models/recipeModels/categoryModel");
const Recipe = require("../../models/recipeModels/recipeModel");

// Show Recipe homepage
async function showHomepage(req, res) {
	try {
		//Grab Categories from Database
		const limitNum = 5;
		const categoriesObj = await Category.find({}).limit(limitNum);
		const latestRecipesObj = await Recipe.find({}).sort({ _id: -1 }).limit(limitNum);
		const thaiRecipesObj = await Recipe.find({ 'category': "Thai" }).limit(limitNum);
		const americanRecipesObj = await Recipe.find({ 'category': "American" }).limit(limitNum);
		const mexicanRecipesObj = await Recipe.find({ 'category': "Mexican" }).limit(limitNum);

		const foodObj = {
			latestRecipesObj,
			thaiRecipesObj,
			americanRecipesObj,
			mexicanRecipesObj
		};

		//Render Homepage
		res.render("subviews/recipeViews/recipeHomepage", {
			title: "KharlEats - Homepage",
			stylesheet: "/styles/recipeStyles/recipeHomepage.css",
			categoriesObj,
			foodObj,
		});
	} catch (err) {
		//Render Error Page
		res.render("errors/home_500", {
			title: "Server Error - KharlAbban",
			error: err,
		});
	}
}

// Show All Categories
async function showCategories(req, res) {
	try {
		//Grab Categories from Database
		const limitNum = 20;
		const categoriesObj = await Category.find({}).limit(limitNum);

		//Render Categories
		res.render("subviews/recipeViews/recipeCategories", {
			title: "KharlEats - Categories",
			stylesheet: "/styles/recipeStyles/recipeHomepage.css",
			categoriesObj,
		});
	} catch (error) {
		//Rrender Error Page
		res.render("errors/home_500", {
			title: "Server Error - KharlAbban",
			error: err,
		});
	}
}

// Show A Recipes Details
async function showRecipeDetails(req, res) {
	try {
		//Grab Recipe from Database
		const limitNum = 20;
		let {recipeId} = req.params;
		const recipe = await Recipe.findById(recipeId);

		//Render Categories
		res.render("subviews/recipeViews/recipeDetails", {
			title: "KharlEats - Recipe Detail",
			stylesheet: "/styles/recipeStyles/recipeHomepage.css",
			recipe
		});
	} catch (error) {
		//Rrender Error Page
		res.render("errors/home_500", {
			title: "Server Error - KharlAbban",
			error: err,
		});
	}
}

async function showCategoryDetails(req, res) {
	try {
		//Grab Category Id from Params
		const limitNum = 20;
		const {categoryName} = req.params;
		const categoryObj = await Category.find({"name": categoryName});
		console.log(categoryObj);

		//Render Categories
		res.render("subviews/recipeViews/categoryDetails", {
			title: "KharlEats - Category Details",
			stylesheet: "/styles/recipeStyles/recipeHomepage.css",
			category: categoryObj
		});
	} catch (err) {
		//Rrender Error Page
		res.render("errors/home_500", {
			title: "Server Error - KharlAbban",
			error: err,
		});
	}
}

module.exports = {
	showHomepage,
	showCategories,
	showRecipeDetails,
	showCategoryDetails
};
