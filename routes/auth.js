const { Router }  = require('express');
const router = Router();
const auth = require('../models/user');

router.post('/login', auth.addUser);

module.exports = router;