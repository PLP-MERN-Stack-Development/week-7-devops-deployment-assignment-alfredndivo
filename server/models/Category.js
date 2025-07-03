// Category.js – Mongoose model for blog categories
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot exceed 200 characters'],
    },
    // handy for showing how many posts belong to this category
    postCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

/* -------- Helpers & Middleware -------- */

// Generate slug from name before saving
CategorySchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();

  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')     // strip non‑word chars
    .replace(/ +/g, '-');        // replace spaces with dashes
  next();
});

/**
 * Increment or decrement postCount from Post middleware.
 * In your Post model, call:
 *   await Category.findByIdAndUpdate(categoryId, { $inc: { postCount: +1 } });
 * when a post is created (and -1 when deleted).
 */

/* -------- Export -------- */
module.exports = mongoose.model('Category', CategorySchema);
