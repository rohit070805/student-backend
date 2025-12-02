const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // 1. Add adminId to track who created this student
  adminId: {
    type: String,
    required: true, 
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // Note: We removed unique: true from here to allow testing with same emails for different teachers if needed, 
    // or keep it if email must be globally unique. Let's keep it simple.
  },
  studentId: {
    type: String,
    required: true,
    // REMOVED "unique: true" from here. 
    // We will enforce uniqueness using the index below.
  },
  pincode: { type: String, default: '' },
  district: { type: String, default: '' },
  state: { type: String, default: '' },
  country: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

// 2. Create a Compound Unique Index
// This ensures that 'studentId' is unique ONLY within the same 'adminId'
studentSchema.index({ studentId: 1, adminId: 1 }, { unique: true });

module.exports = mongoose.model('Student', studentSchema);