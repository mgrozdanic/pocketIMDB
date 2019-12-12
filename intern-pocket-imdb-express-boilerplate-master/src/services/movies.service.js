const { Movie, Likes, Comment } = require('./../models');
var jwt = require('jsonwebtoken');

const index = async (pageParam, filterParam = 'All', token) => {
  // const movies = await Movie.find().exec();
  const resultsPerPage  = 10;
  const page = pageParam || 1;
  let user = getUserIdFromToken(token);

  try {
    const movies = (filterParam === 'All') ? await Movie.find().skip((resultsPerPage * page) - resultsPerPage).limit(resultsPerPage) 
    : await Movie.find({"Genre":{$regex:".*" + filterParam + ".*"}}).skip((resultsPerPage * page) - resultsPerPage).limit(resultsPerPage);
    const moviesFinal = await appendActions(movies, user);
    const nOfMovies = (filterParam === 'All') ? await Movie.count() 
    : await Movie.count({"Genre":{$regex:".*" + filterParam + ".*"}});
    return {movies: moviesFinal, currentPage: page, pages: Math.ceil(nOfMovies / resultsPerPage)}
  } catch (err) {
    throw new Error(err);
  }
};

const getComments = async(search) => {
  const resultsPerPage  = 10;
  const page = search.page || 1;
  try {
    const comments = await Comment.find({movie:search.movie}).skip((resultsPerPage * page) - resultsPerPage).limit(resultsPerPage);
    const nOfComments = await Comment.count({movie:search.movie});
    return {comments, nOfComments, currentCPage: page};
  } catch (err) {
    throw err;
  }
};

const getUserIdFromToken = token => {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  } catch(e) {
    throw new Error(e);
  }
  return decoded.user._id;
}

const userActionDo = async(actionObj, token) => {
  const user = getUserIdFromToken(token);
  const movie = actionObj.movieId;
  const action = actionObj.action;
  const alreadyDidAction = await Likes.findOne({user: user, movie: movie});
  if (alreadyDidAction === null){
    const like = new Likes({user, movie, action});
    return like.save();
  } else {
    return Likes.findByIdAndUpdate(alreadyDidAction._id, {$set:{action:action}}, (err, obj) => {
      if (err) throw err;
      console.log('1 action updated');
    });
    // update
  }
  
}

const appendActions = async(movies, user) => {
    const newMovies = await Promise.all(movies.map(async(movie) => {
      const likes = await Likes.count({movie: movie.id, action: 'LIKE'});
      const dislikes = await Likes.count({movie: movie.id, action: 'DISLIKE'});
      const res = await Likes.findOne({user: user, movie: movie.id});
      let action;
      if (res !== null) {
        action = res.action;
      }
      return { ...movie.toJSON(), likes, dislikes, action};
  }));
    return newMovies;
}

const show = (id) => {
  return Movie.findById(id, (err, obj) => {
    if (err) throw err;
    console.log('1 movie found.')
  })
  // Done, no changes necessary
};

const getEmailFromToken = token =>{
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  } catch(e) {
    throw new Error(e);
  }
  return decoded.user.email;
}

const addComment = (token, movie, comment) => {
  const user = getEmailFromToken(token);
  const commentToSave = new Comment({user, movie, comment});
  return commentToSave.save();

}

const addView = movie => {
  return Movie.update({_id:movie.movie}, {$inc:{views: 1}});
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
    imdbRating,
    views: 0});
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
  userActionDo,
  addView,
  addComment,
  getComments
};
