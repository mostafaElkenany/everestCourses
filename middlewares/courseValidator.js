const { check } = require('express-validator');

const courseValidator = [
    check('name').trim().escape().notEmpty().withMessage('Course name required'),
    check('description').trim().escape().notEmpty().withMessage('Course description required'),
    check('categories').trim().escape().notEmpty().withMessage('Course category required (At least one )'),
    check('categories').custom(async value => {
        if (value.length === 2) {
            return Promise.reject('category required (At least one )');
        }
    }),
    check('points').trim().escape().isInt({ min: 50, max: 500 }).withMessage('Enter a vlid number between(50-500)'),
]

module.exports = courseValidator;