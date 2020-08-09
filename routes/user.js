const express = require('express');
const { getCourses } = require('../controllers/courses');
const { getCategories } = require('../controllers/categories');
const Category = require('../models/Category');
const Course = require('../models/Course');
const router = express.Router();

router.get('/courses', getCourses);
router.get('/categories', getCategories);
router.get('/categories/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        const courses = await Course.find({ categories: { "$in": [category] } });
        res.json(courses);
    } catch (error) {
        next(error);
    }
})
module.exports = router;