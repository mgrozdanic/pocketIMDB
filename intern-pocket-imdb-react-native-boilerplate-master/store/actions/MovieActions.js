import { GET_MOVIES, SET_MOVIES, SET_CURR_PAGE, SET_N_PAGES, GET_MOVIE_FROM_OMDB, OMDB_NOT_FOUND, USER_ACTION, VIEW } from './ActionTypes';

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