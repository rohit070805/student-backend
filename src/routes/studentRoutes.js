const express = require('express');
const router = express.Router();
const { addStudent, getStudents } = require('../controllers/studentController')

// Define the URLs
router.post('/', addStudent); // POST request adds a student
router.get('/', getStudents); // GET request gets list

module.exports = router;