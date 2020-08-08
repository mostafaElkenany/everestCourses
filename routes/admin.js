const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const { registerValidators } = require('../middleware/authValidator');
const categoryValidator = require('../middleware/categoryValidator');
const courseValidator = require('../middleware/courseValidator');
const upload = require('../middleware/multer');
const { registerAdmin, disableUser } = require('../controllers/auth');
const { getCategories, getOneCategory, addCategory, editCategory, deleteCategory } = require('../controllers/categories');
const { getCourses, getOneCourse, addCourse, editCourse, deleteCourse } = require('../controllers/courses');

const router = express.Router();

router.get('/admins', async (req, res, next) => {
    try {
        const admins = await User.find({ isAdmin: true });
        res.status(200).json(admins)
    } catch (error) {
        next(error);
    }
})

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.find({ isAdmin: false });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
})

router.post('/users/:id', disableUser)

router.post('/admins', registerValidators, registerAdmin)

//-------Categories-------//
router.get("/categories", getCategories);

router.get("/categories/:id", getOneCategory);

router.post('/categories', categoryValidator, addCategory)

router.patch('/categories/:id', categoryValidator, editCategory)

router.delete('/categories/:id', deleteCategory)

//-------Courses-------//
router.get("/courses", getCourses);

router.get("/courses/:id", getOneCourse);

router.post('/courses', [upload.single('image'), courseValidator], addCourse)

router.patch('/courses/:id', [upload.single('image'), courseValidator], editCourse)

router.delete('/courses/:id', deleteCourse)

module.exports = router;