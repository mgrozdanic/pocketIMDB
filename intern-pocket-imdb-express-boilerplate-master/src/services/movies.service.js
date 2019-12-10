const { Movie, Likes } = require('./../models');
var jwt = require('jsonwebtoken');

const index = async (pageParam, token) => {
  // const movies = await Movie.find().exec();
  const resultsPerPage  = 10;
  const page = pageParam || 1;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  } catch(e) {
    throw new Error(e);
  }
  const user = decoded.user._id;


  try {
    const movies = await Movie.find().skip((resultsPerPage * page) - resultsPerPage).limit(resultsPerPage);
    const moviesFinal = await appendActions(movies, user);
    const nOfMovies = await Movie.count();
    return {movies, currentPage: page, pages: Math.ceil(nOfMovies / resultsPerPage)}
  } catch (err) {
    throw new Error(err);
  }
};

const appendActions = (movies, user) => {
  return movies.map(async(movie) => {
    const likes = await Likes.count({movie: movie.id, action: 'LIKE'});
    const dislikes = await Likes.count({movie: movie.id, action: 'DISLIKE'});
    const res = await Likes.findOne({user: user, movie: movie.id});
    let action;
    if (res !== null) {
      action = res.action;
    }
    return { ...movie, likes, dislikes, action};
  });
}

const show = (id) => {
  return Movie.findById(id, (err, obj) => {
    if (err) throw err;
    console.log('1 movie found.')
  })
  // Done, no changes necessary
};

const store = ({Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors,
  Plot, Language, Country, Awards, Poster, Production, Metascore, imdbRating}) => {
  console.log(Title, Year);
  const movie = new Movie({Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Production,
    Metascore,
    imdbRating});
  return movie.save();
  // Done, probably needs changes when adding new fields, also change model
};

const update = (id, movie) => {
  return Movie.findByIdAndUpdate(id, {$set:movie}, (err, obj) => {
    if (err) throw err;
    console.log('1 movie updated');
  })
  // Done, no changes necessary
};

const destroy = (id) => {
  return Movie.findByIdAndDelete(id, function(err, obj){
    if (err) throw err;
    console.log('1 movie deleted.');
  });
  // Done, no changes necessary
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
