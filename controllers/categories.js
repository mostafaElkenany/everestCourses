const Category = require('../models/Category');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}

const getOneCategory = async (req, res, next) => {
    try {
        const { params: { id } } = req
        const category = await Category.findById(id)
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}

const addCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Input validation error');
            error.status = 400;
            error.details = errors.array();
            throw error;
        }
        const newCategory = new Category({ name });
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (error) {
        next(error);
    }
}

const editCategory = async (req, res, next) => {
    try {
        const { params: { id } } = req
        const { name } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Input validation error');
            error.status = 400;
            error.details = errors.array();
            throw error;
        }
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true })
        res.status(200).json(category);
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { params: { id } } = req
        const category = await Category.findByIdAndDelete(id)
        await Course.updateMany(
            { cateogries: category._id },
            { $pull: { categories: { $in: [category._id] } } },
            { multi: true }
        )
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }

}

module.exports = {
    getCategories,
    getOneCategory,
    addCategory,
    editCategory,
    deleteCategory,
}