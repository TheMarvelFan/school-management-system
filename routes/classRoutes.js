const express = require('express');
const { createClass, getAllClasses, getClassById, updateClass, deleteClass } = require('../controllers/classController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect('class'), createClass);
router.get('/', protect('class'), getAllClasses);
router.get('/:id', protect('class'), getClassById);
router.put('/:id', protect('class'), updateClass);
router.delete('/:id', protect('class'), deleteClass);

module.exports = router;
