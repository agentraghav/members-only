const { body } = require('express-validator');

const Post = require('../models/post');

exports.post_validation = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter title.')
    .isAlphanumeric(),
  body('body').not().isEmpty().trim().escape(),
];
