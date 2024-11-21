const express = require('express');
const multer = require('multer');
const { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const protect = require('../middlewares/authMiddleware');

// Configure multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

const router = express.Router();

router.post('/', protect('student'), upload.single('profileImage'), createStudent);
router.get('/', protect('student'), getAllStudents);
router.get('/:id', protect('student'), getStudentById);
router.put('/:id', protect('student'), upload.single('profileImage'), updateStudent);
router.delete('/:id', protect('student'), deleteStudent);

module.exports = router;
