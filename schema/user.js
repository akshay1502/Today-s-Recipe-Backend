const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
});

module.exports = {
  userSchema
}