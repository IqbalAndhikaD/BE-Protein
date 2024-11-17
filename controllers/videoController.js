const Video = require("../models/Video");

module.exports = {
  addVideo : async (req, res) => {
    try {
      const { name, path_video, course_id } = req.body;
  
      // Validasi input
      if (!name || !path_video || !course_id) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      const newVideo = new Video({
        name,
        path_video,
        course_id
      });
  
      const savedVideo = await newVideo.save();
      res.status(201).json(savedVideo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getVideos : async (req, res) => {
    try {
      const videos = await Video.find().populate('course_id'); // Mengambil semua video dan mengisi data course
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
