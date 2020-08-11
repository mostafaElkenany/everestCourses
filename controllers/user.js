const User = require('../models/User');
const Course = require('../models/Course');

const enroll = async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const currentUser = await User.findById(req.user.id).populate('courses.course');
        const course = await Course.findById(courseId);

        //check if course is registered
        const isRegistered = currentUser.courses.find(userCourse => userCourse.course._id.toString() === courseId)
        if (isRegistered) {
            const error = new Error('Course already registered');
            error.status = 400;
            throw error;
        }

        currentUser.courses.push({ course: course, status: false })
        await currentUser.save()
        res.json(currentUser.courses);

    } catch (error) {
        next(error);
    }

}

const unEnroll = async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        const currentUser = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { courses: { course: course } } },
            { new: true }
        )
            .populate('courses.course');
        await currentUser.save();
        res.json(currentUser.courses);
    } catch (error) {
        next(error)
    }
}

const getUserCourses = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.user.id).populate('courses.course');
        res.json({ courses: currentUser.courses, points: currentUser.points });
    } catch (error) {
        next(error)
    }
}

const changeCourseStatus = async (req, res, next) => {
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
        res.json({ courses: currentUser.courses, points: currentUser.points });
    } catch (error) {
        next(error)
    }
}

//get users based on their role
const getUsers = (role) => async (req, res, next) => {
    try {
        const admins = await User.find({ isAdmin: role });
        res.status(200).json(admins)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    enroll,
    getUserCourses,
    unEnroll,
    changeCourseStatus,
    getUsers,
};