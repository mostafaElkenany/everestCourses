const express = require('express');
const User = require('../models/User');
const { registerValidators } = require('../middleware/authValidator');
const { registerAdmin } = require('../controllers/auth');

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

router.post('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let user = await User.findById(id);
        user.disabled = !user.disabled;
        user = await user.save();
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
})

router.post('/admins', registerValidators, registerAdmin)

module.exports = router;