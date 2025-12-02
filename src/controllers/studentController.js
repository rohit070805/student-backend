const Student = require('../models/student');

// @desc    Add a new student
const addStudent = async (req, res) => {
  try {
    // 1. Accept adminId from the request
    const { name, email, studentId, pincode, district, state, country, adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    // 2. Check if THIS admin already has a student with this ID
    const studentExists = await Student.findOne({ studentId, adminId });
    
    if (studentExists) {
      return res.status(400).json({ message: 'Student ID already exists for this teacher' });
    }

    // 3. Create the student with the adminId
    const student = await Student.create({
      adminId, // Save the link
      name,
      email,
      studentId,
      pincode,
      district,
      state,
      country
    });

    res.status(201).json(student);
  } catch (error) {
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate Student ID detected.' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all students for a specific teacher
const getStudents = async (req, res) => {
  try {
    // 1. Get the adminId from the query parameters (?adminId=...)
    const { search, adminId } = req.query; 

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required to fetch students' });
    }

    let query = { adminId }; // Always filter by adminId first

    if (search) {
      // Add search logic ON TOP of the adminId filter
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }

    const students = await Student.find(query).sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addStudent, getStudents };