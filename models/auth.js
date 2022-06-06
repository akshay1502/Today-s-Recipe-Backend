const mongoose = require('mongoose');
const { userSchema } = require('../schema/auth');
const user = new mongoose.model('user', userSchema);

const signupUser = async (newUser) => {
  try {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const { id } = await new user({
      ...newUser,
      colorCode: randomColor
    }).save();
    return id;
  } catch (err) {
    console.log('Error creating a new user.', err)
    throw err;
  }
}

const findUser = async (userCredentials) => {
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
  findUser,
  user,
}