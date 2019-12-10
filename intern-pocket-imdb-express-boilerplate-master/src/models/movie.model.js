const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  Title: String,
  Year: String,
  Rated: String,
  Released: String,
  Runtime: String,
  Genre: String,
  Director: String,
  Writer: String,
  Actors: String,
  Plot: String,
  Language: String,
  Country: String,
  Awards: String,
  Poster: String,
  Production: String,
  Metascore: String,
  imdbRating: String,
  views: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
