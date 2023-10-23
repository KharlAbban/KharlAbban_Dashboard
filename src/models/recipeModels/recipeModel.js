const mongoose = require("mongoose");

//create schema
const recipeSchema = new mongoose.Schema({
	name: {
		type: "String",
		required: "The recipe's name is required!",
	},
	decription: {
		type: String,
		// required: "Please give a description",
	},
	email: {
		type: String,
		required: "No email provided",
	},
	ingredients: {
		type: Array,
		required: "Add one or more ingredients",
	},
	category: {
		type: String,
		enum: ["Thai", "Chinese", "Mexican", "American", "Indian"],
		required: "Choose a category",
	},
	image: {
		type: String,
		required: "Include an image",
	},
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
