const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.posts_get = (req, res, next) => {
  Post.find()
    .populate('author')
    .exec(function (err, posts) {
      if (err) {
        return next(err);
      } else {
        res.render('index', { posts: posts });
      }
    });
};

exports.posts_post = (req, res, next) => {
  const { body, title } = req.body;
  const { _id } = req.user;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('create-message', { errors: errors.array() });
  } else {
    const post = new Post({
      body: body,
      title: title,
      author: _id,
    }).save((err) => {
      err ? next(err) : res.redirect('/');
    });
  }
};

exports.create_get = (req, res, next) => {
  res.render('create-message', { errors: undefined });
};
