const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  
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

  },
  pincode: { type: String, default: '' },
  district: { type: String, default: '' },
  state: { type: String, default: '' },
  country: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});


studentSchema.index({ studentId: 1, adminId: 1 }, { unique: true });

module.exports = mongoose.model('Student', studentSchema);