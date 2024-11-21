const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    studentCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Class', classSchema);
