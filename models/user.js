const mongoose = require('mongoose');
const { userSchema } = require('../schema/user');
const user = new mongoose.model('user', userSchema);

const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await new user(req.body).save();
    console.log(email, password);
    res.send('New user is created');
  } catch (err) {
    console.log(err);
    res.status(400).send('Not able to create new user');
  }
}

module.exports = {
  addUser
}