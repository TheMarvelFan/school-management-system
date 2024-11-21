const express = require('express');
const multer = require('multer');
const { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('../controllers/teacherController');
const protect = require('../middlewares/authMiddleware');

// Configure multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

const router = express.Router();

router.post('/', protect('teacher'), upload.single('profileImage'), createTeacher);
router.get('/', protect('teacher'), getAllTeachers);
router.get('/:id', protect('teacher'), getTeacherById);
router.put('/:id', protect('teacher'), upload.single('profileImage'), updateTeacher);
router.delete('/:id', protect('teacher'), deleteTeacher);

module.exports = router;
