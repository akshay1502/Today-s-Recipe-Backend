const mongoose = require('mongoose');
const { userSchema } = require('../schema/auth');
const user = new mongoose.model('user', userSchema);

const signupUser = async (newUser) => {
  try {
    const { id } = await new user(newUser).save();
    return({ id, jsontoken });
  } catch (err) {
    console.log('Error creating a new user.', err)
    throw err;
  }
}

const getUser = async (userCredentials) => {
  try {
    const doc = await user.findOne({ email: userCredentials.email });
    return doc;
  } catch (err) {
    console.log('Error getting the user', err);
    throw err;
  }
}

module.exports = {
  signupUser,
  getUser,
}