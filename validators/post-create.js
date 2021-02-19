const { body } = require('express-validator');

const Post = require('../models/post');

exports.post_validation = [body('body').not().isEmpty().trim().escape()];
