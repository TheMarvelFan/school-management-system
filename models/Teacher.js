const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    subject: { type: String, required: true },
    profileImageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Teacher', teacherSchema);
