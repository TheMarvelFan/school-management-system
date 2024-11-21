const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const register = async (req, res) => {
    try {
        const { role, email, password, name, subject, classId } = req.body;

        if (!role || !['student', 'teacher', 'class'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role provided' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'student') {
            await Student.create({name, email, password: hashedPassword, classId});
        } else if (role === 'teacher') {
            await Teacher.create({name, email, subject, password: hashedPassword});
        } else if (role === 'class') {
            await Class.create({name, email, password: hashedPassword});
        }

        res.status(201).json({ message: `${role} registered successfully` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { role, email, password } = req.body;

        if (!role || !['student', 'teacher', 'class'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role provided' });
        }

        let user;
        if (role === 'student') {
            user = await Student.findOne({ email });
        } else if (role === 'teacher') {
            user = await Teacher.findOne({ email });
        } else if (role === 'class') {
            user = await Class.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({ message: `${role} not found` });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.id, role);

        res.status(200).json({ token, role });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login };
