const { body, validationResult } = require('express-validator');

exports.post = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').isMongoId().withMessage('Category ID must be valid'),
  (req, _res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error(errors.array()[0].msg);
      err.statusCode = 400;
      return next(err);
    }
    next();
  },
];

exports.category = [
  body('name').notEmpty().withMessage('Category name is required'),
  (req, _res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error(errors.array()[0].msg);
      err.statusCode = 400;
      return next(err);
    }
    next();
  },
];
