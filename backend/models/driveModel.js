const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyUrl: { type: String, required: true },  // Updated field to reflect the 'companyUrl' from the form
  driveDate: { type: String, required: true },
  type: { type: String, required: true },
  ctc: { type: String, required: true },
  eligibility: { type: String, required: true }, // Added eligible criteria
  appliedCount: { type: Number, default: 0 }, // Default value for applied count
  hiredCount: { type: Number, default: 0 }, // Default value for hired count
});

module.exports = mongoose.model('Drive', driveSchema);
