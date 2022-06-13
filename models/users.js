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

const followUser = async (userId, selfId, cond) => {
  try {
    let res1, res2;
    if (cond) {
      res1 = await user.findByIdAndUpdate(selfId, { $addToSet: { following: userId }})
      res2 = await user.findByIdAndUpdate(userId, { $addToSet: { follower: selfId }})
    } else {
      res1 = await user.findByIdAndUpdate(selfId, { $pull: { following: userId }})
      res2 = await user.findByIdAndUpdate(userId, { $pull: { follower: selfId }})
    }
    return { res1, res2 };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getUser,
  followUser
};