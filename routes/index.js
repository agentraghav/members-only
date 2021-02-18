const express = require('express');
const router = express.Router();
const passport = require('../passport-config');
const LocalStrategy = require('passport-local').Strategy;
const user_controller = require('../controllers/userController');
const user_validation = require('../validators/user-register');

router.get('/register', user_controller.userRegisterGet);

router.post(
  '/register',
  user_validation.register_validation,
  user_controller.userRegisterPost
);

router.get('/login', user_controller.userLogInGet);

router.post('/login', user_controller.userLogInPost);

module.exports = router;
