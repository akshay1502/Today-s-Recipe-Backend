const jwt = require('jsonwebtoken');
const mangoose = require('mongoose');
const { userSchema } = require('../schema/auth');
const user = new mangoose.model('user', userSchema);

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.JSONSECRET, async (err, decodedToken) => {
        if(err) {
          res.status(403).send({ message: 'You are not authorized' });
        } else {
          const userData = await user.findById(decodedToken.id);
          console.log(userData);
          req.userData = userData;
          next();
        }
      })
    } else {
      res.status(401).send({ message: 'You are not logged in' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = authenticate;