const bcrypt = require('bcrypt');
const auth = require('../models/auth');
const { jwtSign } = require('../helperFunctions/jwtSign');

const signupUser = async (req, res) => {
  try {
    let { email, password, firstName, lastName } = req.body;
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const userId = await auth.signupUser({email, password, firstName, lastName});
    jwtSign(userId, res);
    res.status(200).send({
      message: 'New user created succefully',
      id: userId
    });
  } catch(err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
    if (err.code === 11000) { 
      console.log('This email is already registered.')
      return res.status(400).send({message: 'Email already taken.'})
    }
    if (err.name === 'ValidationError') {
      console.log('Wrong payload');
      return res.status(400).send({message: 'Wrong payload'});
    }
    return res.status(500).send({message: 'Internal server error'});
  }
}

const loginUser = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await auth.findUser(req.body); 
    if (user) {
      const userVerification = await bcrypt.compare(password, user.password);
      if (userVerification) {
        jwtSign(user.id, res);
        res.json({
          message: 'Successfully logged in',
          id: user.id
        })
      } else {
        res.status(403).send({ message: 'Incorrect credentials' });
      }
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = { 
  signupUser,
  loginUser,
}