const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
 
  adminId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  checkInTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CheckIn', checkInSchema);