const { check } = require('express-validator');
const User = require('../models/User');

const registerValidators = [
    check('email').trim().escape().isEmail().withMessage('Invalid e-mail'),
    check('email').custom(async value => {
        const user = await User.findOne({ email: value });
        if (user) {
            return Promise.reject('E-mail already in use');
        }
    }),
    check('firstName').trim().escape().notEmpty().withMessage('First name required'),
    check('lastName').trim().escape().notEmpty().withMessage('Last name required'),
    check('password').trim().escape().notEmpty().withMessage('password required').isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),

]

const loginValidators = [
    check('email').trim().escape().isEmail().withMessage("Invalid e-mail"),
    check('password').trim().notEmpty().withMessage("password is required"),
]

module.exports = {registerValidators, loginValidators};