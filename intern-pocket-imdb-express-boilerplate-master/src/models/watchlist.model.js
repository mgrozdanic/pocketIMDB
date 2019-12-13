const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
    watched: Boolean
});
  
  const WatchList = mongoose.model('WatchList', watchlistSchema);
  
  module.exports = WatchList;
  