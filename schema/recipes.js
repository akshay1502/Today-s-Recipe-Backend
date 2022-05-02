const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  //  validator npm package for validations
  author: String,
  claps: Number
})

module.exports = {
  recipeSchema
}