const { Router } = require('express');
const users = require('../controllers/users');
const authenticate = require('../middlewares/auth');
const router = Router();

router.get('/self', authenticate, users.getSelf);
router.get('/:id', authenticate, users.getUser);
router.patch('/:id/follow', authenticate, users.followUser);

module.exports = router;