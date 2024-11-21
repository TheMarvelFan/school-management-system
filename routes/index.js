const express = require('express');
const studentRoutes = require('./studentRoutes');
const teacherRoutes = require('./teacherRoutes');
const classRoutes = require('./classRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/students', studentRoutes); // Student routes
router.use('/teachers', teacherRoutes); // Teacher routes
router.use('/classes', classRoutes);    // Class routes
router.use('/auth', authRoutes);        // Authentication routes

module.exports = router;
