const Video = require("../models/Video");

module.exports = {
  addVideo : async (req, res) => {
    try {
      const { name, path_video, course_id } = req.body;
  

      if (!name || !path_video || !course_id) {
        return res.status(400).json({ message: 'Semua fields wajib diisi' });
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
      const videos = await Video.find().populate('course_id'); 
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getVideoById: async (req, res) => {
    try {
      const { id } = req.params;

      const video = await Video.findById(id).populate('course_id');

      if (!video) {
        return res.status(404).json({ message: 'Video tidak ditemukan.' });
      }

      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateVideo: async (req, res) => {
    try {
      const { id } = req.params; 
      const { name, path_video, course_id } = req.body; 

      if (!name && !path_video && !course_id) {
        return res.status(400).json({ message: 'Tidak ada perubahan yang diberikan.' });
      }
  
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ message: 'Video tidak ditemukan.' });
      }
  
      video.name = name || video.name; 
      video.path_video = path_video || video.path_video; 
      video.course_id = course_id || video.course_id; 
  
      const updatedVideo = await video.save();
  
      res.status(200).json(updatedVideo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteVideo: async (req, res) => {
    try {
      const { id } = req.params; 
  
      const deletedVideo = await Video.findByIdAndDelete(id); 
  
      if (!deletedVideo) {
        return res.status(404).json({ message: 'Video tidak ditemukan.' });
      }
  
      res.status(200).json({ message: 'Video berhasil dihapus.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
