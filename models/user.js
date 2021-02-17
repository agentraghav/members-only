const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, maxlength: 100, required: true },
  password: { type: String, required: true },
  membership: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', userSchema);
