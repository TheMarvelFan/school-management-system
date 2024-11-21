const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // Register as student, teacher, or class
router.post('/login', login);       // Login as student, teacher, or class

module.exports = router;
