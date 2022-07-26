const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: Object,
  ingredients: Object,
  image: String,
  recipe: Object,
  likes: [String],
  author: Object,
  date: Number,
  comments: [{
    userId: String,
    comment: String
  }],
})

module.exports = {
  recipeSchema
}