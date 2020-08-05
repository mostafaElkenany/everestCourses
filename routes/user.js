const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
        })
        const savedUser = await newUser.save();
        return res.json(savedUser);

    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('wrong email or password');
        } else {
            const match = await bcrypt.compare(password, user.password);
            if (!match) return res.status(400).send('wrong email or password');
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.firstName,
                }
            })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;