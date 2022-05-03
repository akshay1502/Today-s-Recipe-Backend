const { Router }  = require('express');
const router = Router();
const auth = require('../models/auth');

router.post('/signup', auth.signupUser);
router.post('/login', auth.loginUser);

module.exports = router;