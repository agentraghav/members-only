const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, requried: true },
  body: { type: String, requried: true },
  author: { type: Schema.Types.ObjectId, requried: true },
  date_posted: { type: Date, default: Date.now },
});

postSchema.virtual('url').get(function () {
  return '/post/' + this._id;
});

postSchema.virtual('time').get(function () {
  return DateTime.fromJSDate(this.date_posted).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model('Post', postSchema);
