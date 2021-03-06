const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 3, maxlength: 15 },
    lastName: { type: String, required: true, minlength: 3, maxlength: 14 },
    email: { type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    courses: [
        {
            course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
            status: { type: Boolean, required: true, default: false }
        }
    ],
    isAdmin: { type: Boolean, required: true, default: false },
    disabled: { type: Boolean, required: true, default: false },
})

//Hashing user password before save
userSchema.pre('save', async function () {
    const user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;