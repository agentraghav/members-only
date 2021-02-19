const { body, check } = require('express-validator');
const User = require('../models/user');

exports.register_validation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter a name.')
    .isAlphanumeric()
    .withMessage('Enter only alphanumeric charaters on the name')
    .escape(),
  body('username')
    .trim()
    .isEmail()
    .withMessage('The username must be an Email')
    .custom(async (value) => {
      const userCheck = await User.findOne({ username: value });
      if (userCheck !== null) {
        return Promise.reject();
      }
      return Promise.resolve();
    })
    .withMessage('Username already in use.')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('The password must have at least 6 characters.')
    .isAlphanumeric()
    .withMessage('Enter only alphanumeric characters on the password.')
    .escape(),
  body('confirmPassword')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter a confirm password.')
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation is incorrect');
      } else {
        return true;
      }
    }),
];

exports.joinValidation = [
  check('secretPass', 'Not the secret password')
    .trim()
    .escape()
    .custom((value) => {
      return value === '907-9765';
    }),
];
