const express = require('express');
const { register, login } = require('../controllers/auth');
const { registerValidators, loginValidators } = require('../middleware/authValidator');
const { auth, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerValidators, register);

router.post('/login', loginValidators, login)

module.exports = router;