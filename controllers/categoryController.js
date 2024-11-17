const Category = require("../models/category");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const newCategory = new Category({ name });
      await newCategory.save();

      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific category by ID
  getCategoryById: async (req, res) => {
    try {
      const categoryId = req.params.id;

      // Validate the ID format
      const ObjectId = require("mongoose").Types.ObjectId;
      if (!ObjectId.isValid(categoryId)) {
        return res.status(400).json({ error: "Invalid category ID" });
      }

      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update a category by ID
  updateCategoryById: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      );

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a category by ID
  deleteCategoryById: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
