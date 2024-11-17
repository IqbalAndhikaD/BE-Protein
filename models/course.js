const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  about: {
    type: String,
    required: true
  },
  course_keypoints: [{
    type: String
  }],
  students_count: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course