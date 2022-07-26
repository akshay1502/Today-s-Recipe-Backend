const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return  /^\S+@\S+\.\S+$/.test(value);
      },
      message: 'Enter a valid email address.'
    },
    unique: true
  },
  password: String,
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z]+$/g.test(value);
      },
      message: 'First name should contain only alphabets.'
    },
    required: true,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z]+$/g.test(value);
      },
      message: 'First name should contain only alphabets.'
    },
    required: true,
  },
  colorCode: String,
  profileImage: String,
  bookmarkRecipes: [String],
  following: [String],
  follower: [String]
});

module.exports = {
  userSchema
}