const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('../passport-config');
const User = require('../models/user');

exports.userRegisterGet = (req, res, next) => {
  res.render('register', { errors: undefined });
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
          password: hashedPass,
          membership: false,
        }).save((err) => {
          if (err) {
            console.log(err);
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

exports.userLogInPost =
  ('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true,
  }));
