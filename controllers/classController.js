const Class = require('../models/Class');

const createClass = async (req, res) => {
    try {
        const { name, teacherId } = req.body;

        const newClass = await Class.create({ name, teacherId });
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllClasses = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const classes = await Class.find()
            .populate('teacherId', 'name subject')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Class.countDocuments();

        res.json({ total, classes });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getClassById = async (req, res) => {
    try {
        const classObj = await Class.findById(req.params.id).populate('teacherId', 'name subject');
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(classObj);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateClass = async (req, res) => {
    try {
        const updates = req.body;

        const updatedClass = await Class.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(updatedClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteClass = async (req, res) => {
    try {
        const classObj = await Class.findByIdAndDelete(req.params.id);
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createClass,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass,
};
