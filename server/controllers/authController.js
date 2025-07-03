// controllers/authController.js
const User   = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

/* -------------------------------------------------------------------------- */
/*  POST /api/auth/register                                                   */
/* -------------------------------------------------------------------------- */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, email },
    });
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------------------------------------- */
/*  POST /api/auth/login                                                      */
/* -------------------------------------------------------------------------- */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, email },
    });
  } catch (err) {
    next(err);
  }
};
