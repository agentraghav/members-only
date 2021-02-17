const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.userRegister = (req, res, next) => {
  res.render('register');
};

exports.userLogIn = (req, res, next) => {
  res.render('login');
};
