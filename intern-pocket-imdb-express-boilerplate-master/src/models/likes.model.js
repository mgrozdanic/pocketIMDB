const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
    action: {type: String, enum : ['LIKE', 'DISLIKE']}
});
  
  const Likes = mongoose.model('Likes', likesSchema);
  
  module.exports = Likes;
  