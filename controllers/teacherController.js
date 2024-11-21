const Teacher = require('../models/Teacher');
const uploadToCloudinary = require('../utils/cloudinaryUpload');

const createTeacher = async (req, res) => {
    try {
        const { name, email, subject } = req.body;
        let profileImageUrl;

        if (req.file) {
            profileImageUrl = await uploadToCloudinary(req.file);
        }

        const teacher = await Teacher.create({ name, email, subject, profileImageUrl });
        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllTeachers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const filter = { isDeleted: false };

        const teachers = await Teacher.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Teacher.countDocuments(filter);

        res.json({ total, teachers });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher || teacher.isDeleted) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTeacher = async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) {
            updates.profileImageUrl = await uploadToCloudinary(req.file);
        }

        const teacher = await Teacher.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!teacher || teacher.isDeleted) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, { isDeleted: true });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json({ message: 'Teacher soft-deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
};
