const Course = require("../models/Course");

module.exports = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find()
        .populate("admin_id")
        .populate("category_id");
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id)
        .populate("admin_id")
        .populate("category_id");
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createCourse : async (req, res) => {
    try {
      const course = new Course({
        name: req.body.name,
        thumbnail: req.body.thumbnail,
        admin_id: req.body.admin_id,
        category_id: req.body.category_id,
        about: req.body.about,
        course_keypoints: req.body.course_keypoints
      });
  
      const newCourse = await course.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateCourse : async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      Object.assign(course, req.body);
      const updatedCourse = await course.save();
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      await course.remove();
      res.status(200).json({ message: "Course deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
