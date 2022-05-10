const jwt = require('jsonwebtoken');

const jwtSign = (id, res) => {
  const jsontoken = jwt.sign({ id }, process.env.JSONSECRET, { 
    expiresIn: "31d"
  })
  res.cookie('jwt', jsontoken, {
    path: '/', 
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 31),
    httpOnly: true,
    secure: true
  });
}

module.exports = { jwtSign };