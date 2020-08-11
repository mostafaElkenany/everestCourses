const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const register = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Input validation error');
            error.status = 400;
            error.details = errors.array();
            throw error;
        }

        const { firstName, lastName, email, password } = req.body;


        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        })
        const savedUser = await newUser.save();
        return res.json(savedUser);

    } catch (error) {
        next(error);
    }
}

const registerAdmin = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Input validation error');
            error.status = 400;
            error.details = errors.array();
            throw error;
        }

        const { firstName, lastName, email, password } = req.body;

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            isAdmin: true,
        })
        const savedUser = await newUser.save();
        return res.json(savedUser);

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Input validation error');
            error.status = 400;
            error.details = errors.array();
            throw error;
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('wrong email or password');
            error.status = 400;
            throw error;
        } else {
            if (user.disabled) {
                const error = new Error('Account disabled, please contact administrator');
                error.status = 400;
                throw error;
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                const error = new Error('wrong email or password');
                error.status = 400;
                throw error;
            }
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                isAdmin: user.isAdmin,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token })
        }
    } catch (err) {
        next(err);
    }
}

const disableUser = async (req, res, next) => {
    try {
        const { params: { id } } = req
        let user = await User.findById(id);
        user.disabled = !user.disabled;
        user = await user.save();
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

module.exports = { register, registerAdmin, login, disableUser };