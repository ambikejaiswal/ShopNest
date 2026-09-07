const express = require('express');

const router = express.Router();

const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');

const { protect } = require('../middleware/authMiddleware');

const { admin } = require('../middleware/adminMiddleware');

router.post('/', protect, admin, createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;