const jwt = require('jsonwebtoken');
const mangoose = require('mongoose');
const { userSchema } = require('../schema/auth');
const user = new mangoose.model('user', userSchema);

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'akshaysecrect', async (err, decodedToken) => {
        if(err) {
          res.send('You are not authorized'); //not valid msg
        } else {
          const userData = await user.findById(decodedToken);
          req.userData = userData;
          next();
        }
      })
    } else {
      res.status(401).send('User not logged in');
    }
  } catch (err) {
    console.log(err);
    res.status(503).send('Bad implementation');
  }
}

module.exports = authenticate;