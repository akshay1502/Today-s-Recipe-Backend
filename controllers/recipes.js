const recipes = require('../models/recipes');
const mongoose = require('mongoose');
const { cloudinary } = require('../utils/cloudinary');

const getRecipes = async (req, res) => {
  try {
    const allRecipes = await recipes.getRecipes();
    allRecipes.length ? res.json(allRecipes) : res.json({ message: 'No recipes found. Add one to see.'});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const addRecipe = async (req, res) => {
  try {
    const imgFile = req.body.image;
    const { _id } = req.userData;
    const { secure_url } = await cloudinary.uploader.upload(imgFile, {
      upload_preset: "today'srecipe"
    })
    const recipeId = await recipes.addRecipe({ 
      ...req.body, 
      image: secure_url,
      author: _id
    });
    res.json({
      message: "Recipe posted succefully",
      id: recipeId
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const getRecipeofId = async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await recipes.getRecipeofId(id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).send({ message: 'recipe not found' })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const likeOrdislikeRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.userData._id.valueOf();
    const result = await recipes.likeOrdislikeRecipe(recipeId, userId, req.body.like);
    if (result) {
      res.json({ 
        message: `${req.body.like ? 'liked' : 'disliked' } ${recipeId} recipe`,
        success: true
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const bookmarkRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.userData._id;
    const data = req.body.bookmark;
    const result = await recipes.bookmarkRecipe(recipeId, userId, data);
    if (result) {
      res.json({ 
        message: `${data ? 'bookmarked' : 'debookmarked' } ${recipeId} recipe`,
        success: true
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const getSelfRecipes = async (req, res) => {
  try {
    const { _id } = req.userData;
    const selfRecipes = await recipes.getRecipesofUser(_id);
    res.json(selfRecipes);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const getRecipesofUser = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.params.id);
    const recipesOfUser = await recipes.getRecipesofUser(userId);
    res.json(recipesOfUser);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const searchForQuery = async (req, res) => {
  try {
    const query = req.query.query;
    const result = await recipes.searchForRecipeQuery(query);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const addComment = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { _id } = req.userData;
    const comment = {
      userId: _id,
      comment: req.body.comment,
    }
    const result = await recipes.addComment(recipeId, comment);
    if (result) {
      res.json({ 
        message: 'comment added successfully',
        success: true
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = {
  getRecipes,
  addRecipe,
  getRecipeofId,
  likeOrdislikeRecipe,
  bookmarkRecipe,
  getSelfRecipes,
  getRecipesofUser,
  searchForQuery,
  addComment
}