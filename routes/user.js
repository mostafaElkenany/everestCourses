const express = require('express');
const { getCourses } = require('../controllers/courses');
const { getCategories } = require('../controllers/categories');
const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/courses', getCourses);
router.get('/categories', getCategories);
router.get('/categories/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        const courses = await Course.find({ categories: { "$in": [category] } });
        res.json({ courses, category });
    } catch (error) {
        next(error);
    }
})

router.post('/courses/:id', auth, async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const currentUser = await User.findById(req.user.id);
        const course = await Course.findById(courseId);
        //check if course is registered
        const isRegistered = currentUser.courses.find(userCourse => userCourse.course.toString() === courseId)
        if (isRegistered) {
            const error = new Error('Course already registered');
            error.status = 400;
            throw error;
        }
        currentUser.courses.push({ course: course._id, status: false })
        await currentUser.save()
        res.json(currentUser);

    } catch (error) {
        next(error);
    }

})

router.get('/user/courses', auth, async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.user.id).populate('courses.course');
        res.json(currentUser.courses);
    } catch (error) {
        next(error)
    }
})

router.delete('/user/courses/:id', auth, async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        const currentUser = await User.findById(req.user.id);
        await currentUser.updateOne({ $pull: { courses: { course: course } } })
        await currentUser.save();
        res.json(currentUser);
    } catch (error) {
        next(error)
    }
})

router.patch('/user/courses/:id', auth, async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const currentUser = await User.findById(req.user.id).populate('courses.course');
        const userCourse = currentUser.courses.find(userCourse => userCourse.course._id.toString() === courseId)
        userCourse.status = !userCourse.status;
        if (userCourse.status) {
            currentUser.points ? currentUser.points += userCourse.course.points : currentUser.points = userCourse.course.points
        } else {
            currentUser.points ? currentUser.points -= userCourse.course.points : currentUser.points = 0
        }
        await currentUser.save();
        res.json(currentUser);
    } catch (error) {
        next(error)
    }
})

module.exports = router;