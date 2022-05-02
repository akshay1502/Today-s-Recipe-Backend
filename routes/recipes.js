const { Router } = require('express');
const router = Router();
const recipes = require('../models/recipes');

router.get('/recipes', recipes.getRecipes);
router.post('/recipes', recipes.addRecipe);
router.get('/recipes/:author', recipes.getAuthorRecipes);

module.exports = router;