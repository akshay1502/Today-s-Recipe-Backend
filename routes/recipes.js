const { Router } = require('express');
const router = Router();
const recipes = require('../controllers/recipes');
const authenticate = require('../middlewares/auth');

router.get('/recipes', authenticate, recipes.getRecipes);
router.post('/recipes',authenticate, recipes.addRecipe);
router.get('/recipes/:id', authenticate, recipes.getRecipeofId);

module.exports = router;