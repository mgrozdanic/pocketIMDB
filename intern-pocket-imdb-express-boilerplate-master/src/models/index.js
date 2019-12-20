const Movie = require('./movie.model');
const User = require('./user.model');
const Likes = require('./likes.model');
const Comment = require('./comment.model');
const WatchList = require('./watchlist.model');
const Token = require('./notification.token');

module.exports = {
  Movie,
  User,
  Likes,
  Comment,
  WatchList,
  Token
};
