const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

const {
  getActiveCategories,
  getAllCategoriesForAdmin,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

// Users and admins can read active categories for dropdowns
router.get('/', protect, getActiveCategories);

// Admin-only management routes
router.get('/admin/all', protect, adminOnly, getAllCategoriesForAdmin);
router.post('/', protect, adminOnly, createCategory);
router.put('/:id', protect, adminOnly, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

module.exports = router;