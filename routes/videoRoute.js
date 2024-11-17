const videoController = require('../controllers/videoController');
const express = require('express');
const router = express.Router();

router.get('/get', videoController.getVideos); // http://localhost:3523/video/get
router.post('/create', videoController.addVideo); // http://localhost:3523/video/create
router.get('/get/:id', videoController.getVideoById); // http://localhost:3523/video/get/:id
router.put('/update/:id', videoController.updateVideo); // http://localhost:3523/video/update/:id
router.delete('/delete/:id', videoController.deleteVideo); // http://localhost:3523/video/delete/:id

module.exports = router;