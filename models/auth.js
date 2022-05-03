const mongoose = require('mongoose');
const { userSchema } = require('../schema/user');
const bcrypt = require('bcrypt');
const user = new mongoose.model('user', userSchema);
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
  try {
    console.log(req, res);
    let { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const newUser = { email, password };
    const { id } = await new user(newUser).save();
    const jsontoken = jwt.sign({id}, 'akshaysecrect', {
      expiresIn: "7d"
    })
    console.log(jsontoken);
    res.cookie('jwt', jsontoken, { httpOnly: true, })
    res.send('New user is created');
  } catch (err) {
    console.log(err);
    res.status(400).send('Not able to create new user');
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const doc = await user.findOne({email});
  if(doc) {
    const auth = await bcrypt.compare(password, doc.password);
    if (auth) {
      const jsontoken = jwt.sign(doc.id, 'akshaysecrect')
      console.log(jsontoken);
      res.cookie('jwt', jsontoken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 3});
      res.send('successfully logged in');
    } else {
      res.status(401).send('incorrect password');
    }
  } else {
    res.status(404).send('User not found');
  }
}

module.exports = {
  signupUser,
  loginUser,
}