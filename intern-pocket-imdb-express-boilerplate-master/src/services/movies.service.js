const { Movie, Likes, Comment, WatchList, Token, Message } = require('./../models');

const { addToRedis, deleteFromRedis } = require('./redis');
var jwt = require('jsonwebtoken');
var { Expo } = require('expo-server-sdk');
const expo = new Expo();

const index = async (pageParam, filterParam = 'All', search = '', flag = 'All', token) => {
  // const movies = await Movie.find().exec();
  const resultsPerPage  = 10;
  const page = pageParam || 1;
  let user = getUserIdFromToken(token);
  search = search === 'All' ? '' : search;
  try {
    let movies = (filterParam === 'All') ? await Movie.find({"Title":{$regex:".*" + search + ".*"}}).skip((resultsPerPage * page) - resultsPerPage).limit(resultsPerPage) 
    : await Movie.find({"Genre":{$regex:".*" + filterParam + ".*"}, "Title":{$regex:".*" + search + ".*", $options: "i"}}).skip((resultsPerPage * page) - resultsPerPage).limit(resultsPerPage);
    
    if (flag === 'My') {
      movies = movies.filter(movie =>  movie.creator == user);
    }

    const moviesFinal = await appendActions(movies, user);
    const nOfMovies = (filterParam === 'All') ? await Movie.count({"Title":{$regex:".*" + search + ".*"}}) 
    : await Movie.count({"Genre":{$regex:".*" + filterParam + ".*"}, "Title":{$regex:".*" + search + ".*"}});
    const retVal = {movies: moviesFinal, currentPage: page, pages: Math.ceil(nOfMovies / resultsPerPage)};
    if (filterParam === 'All' && search === '') {
      addToRedis(page + "_" + flag, JSON.stringify(retVal));
    }
    return retVal;
  } catch (err) {
    throw new Error(err);
  }
};

const watchListAddRemove = async(token, movie, action, currentPage) => { // treba redis
  const user = getUserIdFromToken(token);
  deleteFromRedis(currentPage + "_All");
  deleteFromRedis(currentPage + "_My");
  if (action === 'add') {
    const entry = new WatchList({user:user, movie: movie, watched: false});
    return entry.save();
  } else {
    return WatchList.deleteOne({"user":user, "movie":movie});
  }
}

const getMostPopular = async(token) => {
  const movies = await Movie.find();
  const user = getUserIdFromToken(token);
  const moviesActions = await appendActions(movies, user);
  moviesActions.sort((a, b) => b.likes - a.likes);
  return moviesActions.length > 10 ? moviesActions.slice(0, 10) : moviesActions;
}

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

const getRelated = async(genre) => {
  const genreList = genre.split(",");
  for (let i = 0; i < genreList.length; i++){
    genreList[i] = genreList[i].trim();
  }

  const movies = await Movie.find();

  for (let i = 0; i < movies.length; i++) {
    movies[i] = { ...movies[i]._doc, hits: 0};
    for (let j = 0; j < genreList.length; j++){
      if (movies[i].Genre.includes(genreList[j])) {
        movies[i].hits++;
      }
    }
  }
  movies.sort((a, b) => b.hits - a.hits);
  return movies.length > 10 ? movies.slice(0, 10) : movies;

}

const userActionDo = async(actionObj, token) => {
  const user = getUserIdFromToken(token);
  const movie = actionObj.movieId;
  const action = actionObj.action;
  const alreadyDidAction = await Likes.findOne({user: user, movie: movie});
  deleteFromRedis(actionObj.currentPage + "_All");
  deleteFromRedis(actionObj.currentPage + "_My");
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
      const watchedList = await WatchList.find({user: user, movie: movie.id});
      const onWatchList = watchedList.length === 0 ? false : true;
      //console.log(watchedList);
      let watched = watchedList.length > 0 ? watchedList[0].watched : false;

      let action;
      if (res !== null) {
        action = res.action;
      }
      return { ...movie.toJSON(), likes, dislikes, action, onWatchList, watched};
  }));
    return newMovies;
}

const getWatchList = async(token, title, filter) => {
  title = title === 'All' ? '' : title;
  filter = filter === 'All' ? '' : filter;
  const user = getUserIdFromToken(token);
  const moviesOnList =await WatchList.find({user: user});
  let moviesObj = [];
  for (let i = 0; i < moviesOnList.length; i++) {
    const movie = await Movie.findById(moviesOnList[i].movie);
    if (movie !== null) {
      console.log(movie.Title.toLowerCase());
      if (movie.Title.toLowerCase().includes(title.toLowerCase()) 
        && movie.Genre.toLowerCase().includes(filter.toLowerCase())) {
          moviesObj.push(movie);
        }
    }
  }
  const moviesFinal = await appendActions(moviesObj, user);

  return moviesFinal;
}


const setToken = (userToken, expoToken) => {
  const user = getUserIdFromToken(userToken);
  const tokenToSave = new Token({user, token: expoToken});
  return tokenToSave.save();
}

const removeToken = userToken => {
  const user = getUserIdFromToken(userToken);
  return Token.deleteOne({user});
}

const movieWatchUnwatch = async(token, movie, action, currentPage) => { // treba redis
  const user = getUserIdFromToken(token);
  deleteFromRedis(currentPage + "_All");
  deleteFromRedis(currentPage + "_My");
  return await WatchList.update({user:user, movie:movie}, {watched: action});
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

const addView = movie => { // treba redis
  deleteFromRedis(movie.currentPage + "_All");
  deleteFromRedis(movie.currentPage + "_My");
  return Movie.update({_id:movie.movie}, {$inc:{views: 1}});
};

const store = async({Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors,
  Plot, Language, Country, Awards, Poster, Production, Metascore, imdbRating}, token) => {
  const creator = getUserIdFromToken(token);
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
    views: 0,
    creator
  });
  const countAll = await Movie.count() + 1;
  const countMy = await Movie.count({creator}) + 1;
  deleteFromRedis(Math.ceil(countAll/10) + "_All");
  deleteFromRedis(Math.ceil(countMy/10) + "_My");
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

const messageRecieve = async(movie, user) => {
  const tokenUser = await Token.findOne({user:user});
  console.log(movie.creator);
  if (tokenUser === null) {
    const msg = new Message({user: movie.creator, movie: movie._id}); // nesto ne savuje ok
    msg.save();
    return;
  }
  handlePushTokens(tokenUser.token, movie);
};

const handlePushTokens = (pushToken, movie) => {
  
  let notifications = [];
  notifications.push({
    to: pushToken,
    sound: 'default',
    title: movie.Title,
    body: 'Someone liked your movie',
    data: { movie },
  });

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
  }})();
}

const getOldNotifications = async(token) => {
  const user = getUserIdFromToken(token);
  const notificationsOld = await Message.find({user:user});
  if (notificationsOld.length === 0) return;
  const movie = await Movie.findById((notificationsOld[notificationsOld.length - 1]).movie);
  if (movie === null) return;

  const tokenUser = await Token.findOne({user:user});

  if (tokenUser === null) return;
  

  let notifications = [];
  notifications.push({
    to: tokenUser.token,
    sound: 'default',
    title: movie.Title,
    body: notificationsOld.length + 'people liked your movie!',
    data: { movie },
  });

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        await Message.deleteMany({user: user});
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
  }})();
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  userActionDo,
  addView,
  addComment,
  getComments,
  getMostPopular,
  getRelated,
  watchListAddRemove,
  getWatchList,
  movieWatchUnwatch,
  getUserIdFromToken,
  setToken,
  messageRecieve,
  removeToken,
  getOldNotifications
};
