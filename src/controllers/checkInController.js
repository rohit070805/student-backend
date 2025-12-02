const CheckIn = require('../models/CheckIn');
const Student = require('../models/student');

// @desc    Check In a Student (Specific to the Teacher)
const addCheckIn = async (req, res) => {
  try {
    // 1. Get studentId AND adminId from the request
    const { studentId, adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    // 2. Find the student belonging to THIS admin
    // This ensures Teacher A cannot check in Teacher B's student
    const student = await Student.findOne({ 
      studentId: { $regex: new RegExp(`^${studentId}$`, 'i') },
      adminId: adminId // CRITICAL: Filter by Admin ID
    });

    if (!student) {
      return res.status(404).json({ message: 'Student ID not found in your class list.' });
    }

    // 3. Create the Check-In Record linked to this admin
    const newCheckIn = await CheckIn.create({
      adminId: adminId, // Save the link
      studentId: student.studentId,
      studentName: student.name,
    });

    res.status(201).json(newCheckIn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get All Check-ins for a specific teacher
const getCheckIns = async (req, res) => {
  try {
    // 1. Get adminId from query params
    const { adminId } = req.query;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    // 2. Filter check-ins by adminId
    const checkIns = await CheckIn.find({ adminId }).sort({ checkInTime: -1 });
    res.status(200).json(checkIns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCheckIn, getCheckIns };