const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path_video: {
    type: String,
    required: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);
module.exports = Video