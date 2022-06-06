const { Router } = require('express');
const { getUser } = require('../controllers/users');
const authenticate = require('../middlewares/auth');
const router = Router();

router.get('/users/:id', authenticate, getUser);

module.exports = router;