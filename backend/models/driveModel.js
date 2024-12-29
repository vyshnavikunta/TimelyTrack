const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
    companyName: String,
    driveDate: String,
    type: String,
    ctc: String,
    status: {
      appliedCount: { type: Number, default: 0 },
      hiredCount: { type: Number, default: 0 },
    },
  });  

  module.exports = mongoose.model('Drive', driveSchema);