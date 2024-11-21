const Student = require('../models/Student');
const uploadToCloudinary = require('../utils/cloudinaryUpload');

const createStudent = async (req, res) => {
    try {
        const { name, email } = req.body;
        let profileImageUrl;

        if (req.file) {
            profileImageUrl = await uploadToCloudinary(req.file);
        }

        const student = await Student.create({ name, email, profileImageUrl });
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const { classId, page = 1, limit = 10 } = req.query;
        const filter = { isDeleted: false };
        if (classId) filter.classId = classId;

        const students = await Student.find(filter)
            .populate('classId', 'name')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Student.countDocuments(filter);

        res.json({ total, students });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('classId', 'name');
        if (!student || student.isDeleted) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) {
            updates.profileImageUrl = await uploadToCloudinary(req.file);
        }

        const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!student || student.isDeleted) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, { isDeleted: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student soft-deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};
