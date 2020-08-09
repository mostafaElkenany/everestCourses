const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    points: { type: Number, min: 50, max: 500 },
    image: { type: String, required: true },
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;