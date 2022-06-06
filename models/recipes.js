const mongoose = require('mongoose');
const { recipeSchema } = require('../schema/recipes');
const recipe = new mongoose.model("recipe", recipeSchema);
const { getUser } = require('./users');

const getRecipes = async () => {
  try {
    const allRecipes = await recipe.find().lean();
    await Promise.all(allRecipes.map(async (recipe) => {
      const user = await getUser(recipe.author);
      recipe.author = `${user.firstName} ${user.lastName}`;
      recipe.authorProfileImage = user.profileImage;
      recipe.authorColorCode = user.colorCode;
      return recipe;
    }));
    return allRecipes;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const addRecipe = async (recipeData) => {
  try {
    const recipeDoc = new recipe({ 
      ...recipeData, 
      likes: 0,
      comments: [],
      date: Date.now(),
    });
    const res = await recipeDoc.save();
    if (res) {
      return res._id.valueOf();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const getRecipeofId = async (id) => {
  try {
    const recipeOfId = await recipe.findById(id).lean().exec();
    const user = await getUser(recipeOfId.author);
    recipeOfId.author = `${user.firstName} ${user.lastName}`;
    recipeOfId.authorProfileImage = user.profileImage;
    recipeOfId.authorColorCode = user.colorCode;
    return recipeOfId;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getRecipes,
  addRecipe,
  getRecipeofId
}