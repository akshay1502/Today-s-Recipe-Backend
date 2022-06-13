const recipes = require('../models/recipes');
const { cloudinary } = require('../utils/cloudinary');

const getRecipes = async (req, res) => {
  try {
    const allRecipes = await recipes.getRecipes();
    allRecipes.length ? res.json({allRecipes}) : res.json({ message: 'No recipes found. Add one to see.'});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const addRecipe = async (req, res) => {
  try {
    console.log(req.body);
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
    console.log(recipeId);
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
      res.json({ message: `${req.body.like ? 'liked' : 'disliked' } ${id} recipe` });
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
      res.json({ message: `${data ? 'bookmarked' : 'debookmarked' } ${recipeId} recipe` })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const getSelfRecipes = async (req, res) => {
  try {
    const { _id } = req.userData;
    const selfRecipes = await recipes.getSelfRecipes(_id);
    res.json(selfRecipes);
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
  getSelfRecipes
}