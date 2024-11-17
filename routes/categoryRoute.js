const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/create', categoryController.createCategory); // http://localhost:3523/category/create
router.get('/all', categoryController.getAllCategories); // http://localhost:3523/category/all
router.get('/get/:id', categoryController.getCategoryById); // http://localhost:3523/category/get/:id
router.put('/update/:id', categoryController.updateCategoryById); // http://localhost:3523/category/update/:id
router.delete('/delete/:id', categoryController.deleteCategoryById); // http://localhost:3523/category/delete/:id

module.exports = router;