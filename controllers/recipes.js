const recipes = require('../models/recipes');

const getRecipes = async (req, res) => {
  try {
    const allRecipes = await recipes.getRecipes();
    console.log(allRecipes);
    allRecipes.length ? res.json({allRecipes}) : res.json({ message: 'No recipes found. Add one to see.'});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

const getAuthorRecipes = async (req, res) => {
  try {
    const id = req.params.id;
    const authorRecipes = await recipes.getAuthorRecipes(id);
    authorRecipes.length
      ? res.json(authorRecipes) 
      : res.json({ message: `No recipes of ${id} found` });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = {
  getRecipes,
  getAuthorRecipes
}