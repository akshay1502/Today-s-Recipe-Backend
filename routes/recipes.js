const { Router } = require('express');
const router = Router();
const recipes = require('../controllers/recipes');
const authenticate = require('../middlewares/auth');

router.get('/', authenticate, recipes.getRecipes);
router.post('/',authenticate, recipes.addRecipe);
router.get('/users/self', authenticate, recipes.getSelfRecipes);
router.get('/users/:id', authenticate, recipes.getRecipesofUser);
router.get('/search', authenticate, recipes.searchForQuery);
router.get('/:id', authenticate, recipes.getRecipeofId);
router.patch('/:id/likeOrdislike', authenticate, recipes.likeOrdislikeRecipe);
router.patch('/:id/bookmark', authenticate, recipes.bookmarkRecipe);

module.exports = router;