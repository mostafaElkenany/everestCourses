const express = require('express');
const User = require('../models/User');
const { registerValidators } = require('../middlewares/authValidator');
const categoryValidator = require('../middlewares/categoryValidator');
const courseValidator = require('../middlewares/courseValidator');
const upload = require('../middlewares/multer');
const { registerAdmin, disableUser } = require('../controllers/auth');
const { getCategories, getOneCategory, addCategory, editCategory, deleteCategory } = require('../controllers/categories');
const { getCourses, getOneCourse, addCourse, editCourse, deleteCourse } = require('../controllers/courses');
const { getUsers } = require('../controllers/user')
const router = express.Router();

//-------List/Add admins-------//
router.get('/admins', getUsers(true))
router.post('/admins', registerValidators, registerAdmin)

//-------List/disable users-------//
router.get('/users', getUsers(false))
router.post('/users/:id', disableUser)

//-------Categories CRUD routes-------//
router.get("/categories", getCategories);
router.get("/categories/:id", getOneCategory);
router.post('/categories', categoryValidator, addCategory)
router.patch('/categories/:id', categoryValidator, editCategory)
router.delete('/categories/:id', deleteCategory)

//-------Courses CRUD routes-------//
router.get("/courses", getCourses);
router.get("/courses/:id", getOneCourse);
router.post('/courses', [upload.single('image'), courseValidator], addCourse)
router.patch('/courses/:id', [upload.single('image'), courseValidator], editCourse)
router.delete('/courses/:id', deleteCourse)

module.exports = router;