const CheckIn = require('../models/CheckIn');
const Student = require('../models/student');


const addCheckIn = async (req, res) => {
  try {
 
    const { studentId, adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    const student = await Student.findOne({ 
      studentId: { $regex: new RegExp(`^${studentId}$`, 'i') },
      adminId: adminId 
    });

    if (!student) {
      return res.status(404).json({ message: 'Student ID not found in your class list.' });
    }

    
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


const getCheckIns = async (req, res) => {
  try {
    
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