const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { passport } = require('passport');

exports.userRegisterGet = (req, res, next) => {
  res.render('register');
};

exports.userRegisterPost = (req, res, next) => {
  const errors = validationResult(req);
  const { password, username, name } = req.body;
  if (!errors.isEmpty()) {
    res.render('register', { errors: errors.array() });
  } else {
    bcrypt.hash(password, 10, (err, hashedPass) => {
      if (err) {
        res.redirect('/');
      } else {
        const user = new User({
          username: username,
          name: name,
          password,
          hashedPass,
          membership: false,
        }).save((err) => {
          if (err) {
            return next(err);
          }
          passport.authenticate('local')(req, res, () => {
            return res.redirect('/');
          });
        });
      }
    });
  }
};

exports.userLogInGet = (req, res, next) => {
  res.render('login');
};
