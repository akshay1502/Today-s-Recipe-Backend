const user = require('../models/users');
const { userSchema } = require('../schema/auth');
const { cloudinary } = require('../utils/cloudinary');

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

const getSelf = (req, res) => {
  try {
    const user = req.userData;
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).message({ message: 'Internal server error' });
  }
}

const followUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const selfId = req.userData._id;
    const cond = req.body.follow;
    const { res1, res2 } = await user.followUser(userId, selfId, cond);
    if (res1 && res2) {
      res.json({ message: `${cond ? 'followed' : 'unfollowed' } ${userId}` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).message({ message: 'Internal server error' });
  }
}

const updateSelf = async (req, res) => {
  try {
    const imgFile = req.body.profileImage;
    const { _id } = req.userData;
    const { secure_url } = await cloudinary.uploader.upload(imgFile, {
      upload_preset: "today'srecipe"
    })
    const result = await user.updateSelf(_id, {
      ...req.body,
      profileImage: secure_url
    })
    if (result) {
      res.json({
        message: 'Profile updated successfully',
        id: _id,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).message({ message: 'Internal server error' });
  }
}

module.exports = {
  getUser,
  getSelf,
  followUser,
  updateSelf,
};