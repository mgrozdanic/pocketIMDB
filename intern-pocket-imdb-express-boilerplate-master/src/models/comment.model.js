const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: String,
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
    comment: String
});
  
  const Comment = mongoose.model('Comment', commentSchema);
  
  module.exports = Comment;
  