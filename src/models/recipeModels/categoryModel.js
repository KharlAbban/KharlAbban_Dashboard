const mongoose = require("mongoose");

//create schema
const categorySchema = new mongoose.Schema({
  name: {
    type: "String",
    required: "The category name is required!",
  },
  image: {
    type: "String",
    required: "Please add an image!",
  },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
