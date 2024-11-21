const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: false },
    profileImageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Student', studentSchema);
