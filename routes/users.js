const { Router } = require('express');
const users = require('../controllers/users');
const authenticate = require('../middlewares/auth');
const router = Router();

router.get('/users/:id', authenticate, users.getUser);
router.get('/users/self', users.getSelf);

module.exports = router;