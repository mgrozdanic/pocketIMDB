const { Movie } = require('./../models');

const index = async () => {
  const movies = await Movie.find().exec();

  return movies;
};

const show = (id) => {
  return Movie.findById(id, (err, obj) => {
    if (err) throw err;
    console.log('1 movie found.')
  })
  // Done
};

const store = ({title, description, imageUrl}) => {
  if (!title || !description || !imageUrl) {
    return {err:'Malformed request data'};
  }
  const movie = new Movie({title, description, imageUrl});
  return movie.save();
  // Done
};

const update = (id, movie) => {
  return Movie.findByIdAndUpdate(id, {$set:movie}, (err, obj) => {
    if (err) throw err;
    console.log('1 movie updated');
  })
  // Done
};

const destroy = (id) => {
  return Movie.findByIdAndDelete(id, function(err, obj){
    if (err) throw err;
    console.log('1 movie deleted.');
  });
  // Done?
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
