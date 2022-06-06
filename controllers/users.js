const user = require('../models/users');

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await user.getUser(id);
    if (userData) {
      res.json(userData);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

module.exports = {
  getUser
};