const Student = require('../models/student');


const addStudent = async (req, res) => {
  try {
  
    const { name, email, studentId, pincode, district, state, country, adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

   
    const studentExists = await Student.findOne({ studentId, adminId });
    
    if (studentExists) {
      return res.status(400).json({ message: 'Student ID already exists for this teacher' });
    }

    
    const student = await Student.create({
      adminId, 
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
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate Student ID detected.' });
    }
    res.status(500).json({ message: error.message });
  }
};


const getStudents = async (req, res) => {
  try {
    
    const { search, adminId } = req.query; 

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required to fetch students' });
    }

    let query = { adminId }; 
    if (search) {
     
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