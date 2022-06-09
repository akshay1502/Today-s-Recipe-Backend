const user = require('../models/users');

const getUser = async (req, res) => {
  try {
    console.log('calling from geUser');
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

const getSelf = (req, res) => {
  try {
    const user = req.userData;
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).message({ message: 'Internal server error' });
  }
}

module.exports = {
  getUser,
  getSelf
};