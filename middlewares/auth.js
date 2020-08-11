const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) return res.status(401).json({ message: "Authentication failed" });
        const currentUser = jwt.verify(token, process.env.JWT_SECRET);
        if (!currentUser) return res.status(401).json({ message: "Authentication failed" });
        req.user = currentUser;
        next();
    } catch (error) {
        res.send(error);
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) return res.status(401).json({ message: "Authentication failed" });
        if (currentUser.isAdmin) next();
        else return res.status(401).json({ message: "Authorization failed" });
    } catch (error) {
        res.send(error);
    }


}


module.exports = { auth, isAdmin };