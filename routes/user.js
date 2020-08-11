const express = require('express');
const { getCategories, getCategoryCourses } = require('../controllers/categories');
const { enroll, getUserCourses, unEnroll, changeCourseStatus } = require('../controllers/user');
const Course = require('../models/Course');
const { auth } = require('../middlewares/auth');
const paginate = require('../middlewares/pagination');

const router = express.Router();

//get courses paginated
router.get('/courses', paginate(Course), async (req, res, next) => {
    res.status(200).json(res.paginatedResults)
});

//get all categories
router.get('/categories', getCategories);

router.get('/categories/:id', getCategoryCourses)

router.get('/user/courses', auth, getUserCourses)

router.post('/user/courses/:id', auth, enroll)

router.patch('/user/courses/:id', auth, changeCourseStatus)

router.delete('/user/courses/:id', auth, unEnroll)

module.exports = router;