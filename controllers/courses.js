const Course = require('../models/Course');
const { validationResult } = require('express-validator');


const getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).populate('categories');
        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
}

const getOneCourse = async (req, res, next) => {
    try {
        const { params: { id } } = req
        const course = await Course.findById(id).populate('categories');
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
}

const addCourse = async (req, res, next) => {
    try {
        const { name, description, categories, points } = req.body;
        const image = req.file;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Input validation error');
            error.status = 400;
            error.details = errors.array();
            throw error;
        }
        if (req.imageError) {
            const error = new Error(req.imageError);
            error.status = 400;
            throw error;
        }
        if (!image) {
            const error = new Error("Image required");
            error.status = 400;
            throw error;
        }
        const parsedCat = JSON.parse(categories.replace(/&quot;/g, '"'));
        const newCourse = new Course({
            name,
            description,
            categories: parsedCat,
            points,
            image: image.path
        });
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    } catch (error) {
        next(error);
    }
}

const editCourse = async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const { name, description, categories, points } = req.body;
        const image = req.file;
        if (req.imageError) {
            const error = new Error(req.imageError);
            error.status = 400;
            throw error;
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Input validation error');
            error.status = 400;
            error.details = errors.array();
            throw error;
        }
        const parsedCat = JSON.parse(categories.replace(/&quot;/g, '"'));
        let updateObj = {}
        if (image) {
            updateObj = {
                name,
                description,
                categories: parsedCat,
                points,
                image: image.path
            }
        } else {
            updateObj = {
                name,
                description,
                categories: parsedCat,
                points,
            }
        }
        const course = await Course.findByIdAndUpdate(id, updateObj, { new: true });
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
}

const deleteCourse = async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const course = await Course.findByIdAndDelete(id);
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getCourses,
    getOneCourse,
    addCourse,
    editCourse,
    deleteCourse,
}