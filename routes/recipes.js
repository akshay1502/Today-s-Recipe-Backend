const { Router } = require('express');
const router = Router();
const recipes = require('../models/recipes');
const authenticate = require('../middlewares/auth');

router.get('/recipes', authenticate, recipes.getRecipes);
router.post('/recipes', recipes.addRecipe);
router.get('/recipes/:author', recipes.getAuthorRecipes);

module.exports = router;