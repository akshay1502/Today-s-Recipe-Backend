const { Router } = require('express');
const router = Router();
const recipes = require('../controllers/recipes');
const authenticate = require('../middlewares/auth');
const { route } = require('./users');

router.get('/recipes', authenticate, recipes.getRecipes);
router.post('/recipes',authenticate, recipes.addRecipe);
router.get('/recipes/:id', authenticate, recipes.getRecipeofId);
router.patch('/recipes/:id/likeOrdislike', authenticate, recipes.likeOrdislikeRecipe);
router.patch('/recipes/:id/bookmark', authenticate, recipes.bookmarkRecipe);

module.exports = router;