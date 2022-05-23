const mongoose = require('mongoose');
const { recipeSchema } = require('../schema/recipes');
const recipe = new mongoose.model("recipe", recipeSchema);

const getRecipes = async () => {
  try {
    const allRecipes = await recipe.find();
    return allRecipes;
  } catch (err) {
    console.log(err);
    throw err;
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

const getAuthorRecipes = async (id) => {
  try {
    const authorRecipes = await recipe.find({_id: id});
    return authorRecipes;
  } catch (err) {
    res.status(404).send("Enable to get author Recipes");
  }
}

module.exports = {
  getRecipes,
  addRecipe,
  getAuthorRecipes
}