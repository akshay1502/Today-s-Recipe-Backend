const { Router }  = require('express');
const router = Router();
const auth = require('../controllers/auth');

router.post('/signup', auth.signupUser);
router.post('/login', auth.loginUser);
router.get('/logout', auth.logout);

module.exports = router;