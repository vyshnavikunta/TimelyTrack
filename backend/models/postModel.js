const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  tags: [String],
});

module.exports = mongoose.model('Post', postSchema);
