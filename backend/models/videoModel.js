const mongoose = require('mongoose');

// Define the schema for the video
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Optionally, you can add timestamps to track when the video was uploaded

// Create a model for the video schema
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
