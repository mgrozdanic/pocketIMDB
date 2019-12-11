const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
    comment: String
});
  
  const Comment = mongoose.model('Comment', commentSchema);
  
  module.exports = Comment;
  