const { Movie } = require('./../models');

const index = async (pageParam) => {
  // const movies = await Movie.find().exec();
  const resultsPerPage  = 10;
  const page = pageParam || 1;

  try {
    const movies = await Movie.find().skip((resultsPerPage * page) - resultsPerPage).limit(resultsPerPage);
    const nOfMovies = await Movie.count();
    return {movies, currentPage: page, pages: Math.ceil(nOfMovies / resultsPerPage)}
  } catch (err) {
    throw new Error(err);
  }
};

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
