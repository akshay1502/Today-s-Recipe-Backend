const { Router } = require('express');
const users = require('../controllers/users');
const authenticate = require('../middlewares/auth');
const router = Router();

router.get('/users/self', authenticate, users.getSelf);
router.get('/users/:id', authenticate, users.getUser);
router.patch('/users/:id/follow', authenticate, users.followUser);

module.exports = router;