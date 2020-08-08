const { check } = require('express-validator');
const Category = require('../models/Category');

const categoryValidator = [
    check('name').trim().escape().notEmpty().withMessage('Category name required'),
    check('name').custom(async value => {
        const category = await Category.findOne({ name: value });
        if (category) {
            return Promise.reject('Category already exists');
        }
    }),
]

module.exports = categoryValidator