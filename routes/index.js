const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const user_validation = require('../validators/user-register');
const post_controller = require('../controllers/postController');
const post_validation = require('../validators/post-create');
router.get('/register', user_controller.userRegisterGet);

router.post(
  '/register',
  user_validation.register_validation,
  user_controller.userRegisterPost
);

router.get('/login', user_controller.userLogInGet);

router.post('/login', user_controller.userLogInPost);

router.get('/join', authenticated, user_controller.join_get);
router.post(
  '/join',
  authenticated,
  user_validation.joinValidation,
  user_controller.join_post
);

router.get('/create-message', authenticated, post_controller.create_get);
router.post(
  '/create-message',
  authenticated,
  post_validation.post_validation,
  post_controller.create_post
);

module.exports = router;
