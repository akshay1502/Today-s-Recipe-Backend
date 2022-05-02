const mongoose = require('mongoose');
const { recipeSchema } = require('../schema/recipes');
const recipe = new mongoose.model("recipe", recipeSchema);

const getRecipes = async (req, res) => {
  try {
    const result = await recipe.find();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
}

const addRecipe = async (req, res) => {
  try {
    const recipeData = req.body;
    const recipeDoc = new recipe(recipeData);
    const addRecipe = await recipeDoc.save()
    res.send('recipe added successfully');
  } catch (err) {
    res.status(404).send(err);
  }
}

const getAuthorRecipes = async (req, res) => {
  try {
    const author = req.params.author;
    const authorRecipes = await recipe.find({author: author});
    Object.keys(authorRecipes).length ? res.json(authorRecipes) : res.send(`No recipes of ${author} found`);
  } catch (err) {
    res.status(404).send("Enable to get author Recipes");
  }
}

module.exports = {
  getRecipes,
  addRecipe,
  getAuthorRecipes
}