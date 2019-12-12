import { GET_MOVIES, SET_MOVIES, SET_CURR_PAGE, SET_N_PAGES, GET_MOVIE_FROM_OMDB, OMDB_NOT_FOUND, 
  USER_ACTION, VIEW, SET_COMMENT, GET_COMMENTS, SET_COMMENTS, COMMENTS_NEW_PAGE, ADD_MOVIE, FILTER } 
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