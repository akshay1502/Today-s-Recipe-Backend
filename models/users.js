const mongoose = require('mongoose');
const user = mongoose.model('user');

const getUser = async (id) => {
  try {
    const userData = await user.findById(id);
    return userData
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getUser
};