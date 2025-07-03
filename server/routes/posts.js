const express   = require('express');
const router    = express.Router();
const auth    = require('../middleware/auth');
const upload = require('../middleware/upload');
const { addComment } = require('../controllers/postController');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const validate  = require('../middleware/validate');   // Joi / express‑validator rules

// GET /api/posts               -> all posts
router.get('/', getPosts);

// GET /api/posts/:id           -> single post
router.get('/:id', getPost);

// POST /api/posts              -> create post
router.post('/', auth, upload.single('featuredImage'), createPost);

// POST /api/posts/:id/comments
router.post('/:id/comments', auth, addComment);

// PUT /api/posts/:id           -> update post
router.put('/:id', auth, validate.post, updatePost);

// DELETE /api/posts/:id        -> remove post
router.delete('/:id', auth, deletePost);

module.exports = router;