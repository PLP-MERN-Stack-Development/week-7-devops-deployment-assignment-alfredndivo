const Post = require('../models/Post');
const slugify = require('slugify');

// GET /api/posts
// GET /api/posts?search=react&page=1&limit=10
exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.status(200).json({ posts, total });
  } catch (err) {
    console.error('Get posts error:', err);
    res.status(500).json({ message: 'Failed to fetch posts.' });
  }
};


// GET /api/posts/:id
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category').populate('author');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};


exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    // Handle image
    let featuredImagePath = '';
    if (req.file && req.file.filename) {
      featuredImagePath = `/uploads/${req.file.filename}`;
    }

    // Build the new post
    const newPost = new Post({
      title,
      content,
      category,
      tags: JSON.parse(tags || '[]'), // fallback to [] if empty
      featuredImage: featuredImagePath,
      author: req.user._id,
      slug: slugify(title, { lower: true, strict: true })
    });

    // Save post
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);

  } catch (err) {
    console.error('❌ Create post error:', err);

    // Handle mongoose validation error more clearly
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({ message: 'Server error while creating post' });
  }
};


// PUT /api/posts/:id
exports.updatePost = async (req, res, next) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/posts/:id
exports.deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      content: req.body.content,
      user: req.user._id  // req.user should be set by the auth middleware
    };

    post.comments.unshift(comment);
    await post.save();

    const populatedPost = await post.populate('comments.user', 'name');

    res.status(201).json(populatedPost);
  } catch (err) {
    console.error('Add comment error:', err);
    res.status(500).json({ message: err.message });
  }
};
