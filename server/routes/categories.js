const express  = require('express');
const router   = express.Router();
const {getCategories,createCategory} = require('../controllers/categoryController');
const validate = require('../middleware/validate');

// GET /api/categories          -> all categories
router.get('/', getCategories);

// POST /api/categories         -> create category
router.post('/', validate.category, createCategory);

module.exports = router;
