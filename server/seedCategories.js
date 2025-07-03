// seedCategories.js – run with: node seedCategories.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');

dotenv.config();

const categories = [
  { name: 'Technology', description: 'All tech-related posts' },
  { name: 'Health', description: 'Well-being and health tips' },
  { name: 'Travel', description: 'Travel stories and guides' },
  { name: 'Education', description: 'Learning and development' },
  { name: 'Finance', description: 'Money, savings, and investing' },
  { name: 'Entertainment', description: 'Movies, shows, and fun' },
  { name: 'Coding', description: 'Programming and software' },
  { name: 'Faith', description: 'Spiritual reflections' },
  { name: 'Campus Life', description: 'College experiences' },
  { name: 'Food', description: 'Recipes and foodie tales' },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    for (const cat of categories) {
      const exists = await Category.findOne({ name: cat.name });
      if (!exists) {
        await Category.create(cat); // .create() runs the pre-save slug hook
      }
    }

    console.log('✅ Categories added successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder error:', err.message);
    process.exit(1);
  }
})();
