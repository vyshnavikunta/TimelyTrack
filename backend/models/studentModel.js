const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
