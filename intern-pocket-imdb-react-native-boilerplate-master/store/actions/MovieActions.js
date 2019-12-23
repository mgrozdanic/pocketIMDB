import { GET_MOVIES, SET_MOVIES, SET_CURR_PAGE, SET_N_PAGES, GET_MOVIE_FROM_OMDB, OMDB_NOT_FOUND, 
  USER_ACTION, VIEW, SET_COMMENT, GET_COMMENTS, SET_COMMENTS, COMMENTS_NEW_PAGE, ADD_MOVIE,
  GET_MOST_POPULAR, SET_MOST_POPULAR, GET_RELATED, SET_RELATED, WATCHLIST_ACTION, GET_WATCHLIST,
  SET_WATCHLIST, MOVIE_WATCH_UNWATCH, SET_MY_MOVIES, SET_MY_CURR_PAGE, SET_MY_N_PAGES, SET_TOKEN, 
  SEND_NOTIFICATION } 
  from './ActionTypes';

export const getMovies = (data) => {
  return {
    type: GET_MOVIES,
    payload: data
  };
};

export const setMovies = payload => {
  return {
    type: SET_MOVIES,
    payload
  };
};

export const setCurrPage = payload => {
  return {
    type: SET_CURR_PAGE,
    payload
  };
};

export const setNPages = payload => {
  return {
    type: SET_N_PAGES,
    payload
  };
};

export const setMyMovies = payload => {
  return {
    type: SET_MY_MOVIES,
    payload
  };
};

export const setMyCurrPage = payload => {
  return {
    type: SET_MY_CURR_PAGE,
    payload
  };
};

export const setMyNPages = payload => {
  return {
    type: SET_MY_N_PAGES,
    payload
  };
};

export const getMovieFromOMDb = payload => {
  return {
    type: GET_MOVIE_FROM_OMDB,
    payload
  };
};

export const omdbNotFound = payload => {
  return {
    type: OMDB_NOT_FOUND,
    payload
  };
};

export const setUserAction = payload => {
  return {
    type: USER_ACTION,
    payload
  };
};

export const setView = payload => {
  return {
    type: VIEW,
    payload
  };
};

export const setCommentAction = payload => {
  return {
    type: SET_COMMENT,
    payload
  };
};

export const getCommentsAction = payload => {
  return {
    type: GET_COMMENTS,
    payload
  };
};

export const setCommentsAction = payload => {
  return {
    type: SET_COMMENTS,
    payload
  };
};

export const commentsNewPageAction = payload => {
  return {
    type: COMMENTS_NEW_PAGE,
    payload
  };
};

export const addMovieAction = payload => {
  return {
    type: ADD_MOVIE,
    payload
  };
};

export const getMostPopularAction = () => {
  return {
    type: GET_MOST_POPULAR
  };
};

export const setMostPopularAction = payload => {
  return {
    type: SET_MOST_POPULAR,
    payload
  };
};

export const getRelated = payload => {
  return {
    type: GET_RELATED,
    payload
  };
};

export const setRelated = payload => {
  return {
    type: SET_RELATED,
    payload
  };
};

export const watchListAction = payload => {
  return {
    type: WATCHLIST_ACTION,
    payload
  };
};

export const getWatchListAction = payload => {
  return {
    type: GET_WATCHLIST,
    payload
  };
};

export const setWatchListAction = payload => {
  return {
    type: SET_WATCHLIST,
    payload
  };
};

export const movieWatchUnwatchAction = payload => {
  return {
    type: MOVIE_WATCH_UNWATCH,
    payload
  };
};

export const setTokenAction = payload => {
  return {
    type: SET_TOKEN,
    payload
  };
};

export const sendNotificationAction = payload => {
  return {
    type: SEND_NOTIFICATION,
    payload
  };
};