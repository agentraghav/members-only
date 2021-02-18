const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.userRegisterGet = (req, res, next) => {
  res.render('register');
};

exports.userRegisterPost = (req, res, next) => {};

exports.userLogInGet = (req, res, next) => {
  res.render('login');
};
