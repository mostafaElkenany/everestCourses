const { check } = require('express-validator');

const courseValidator = [
    check('name').trim().escape().notEmpty().withMessage('Course name required'),
    check('description').trim().escape().notEmpty().withMessage('Course description required'),
    check('categories').trim().escape().notEmpty().withMessage('category required (At least one )'),

]

module.exports = courseValidator;