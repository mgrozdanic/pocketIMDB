import { all, takeLatest, take } from 'redux-saga/effects';
import { LOGIN, REGISTER, GET_MOVIES, CHCK_UNIQUE, GET_MOVIE_FROM_OMDB, USER_ACTION, VIEW, SET_COMMENT, GET_COMMENTS, ADD_MOVIE, FILTER, GET_MOST_POPULAR, GET_RELATED } from '../actions/ActionTypes';
import { userLogin, userRegister, userUnique } from './AuthSagas';
import { moviesGet, moviesGetFromOmdb, userAction, viewAction, commentSet, commentsGet, addMovieUser, mostPopular, relatedGet } from './MovieSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    // checking if email is unique
    takeLatest(CHCK_UNIQUE, userUnique),
    // end
    takeLatest(REGISTER, userRegister),
    takeLatest(GET_MOVIES, moviesGet),
    takeLatest(GET_MOVIE_FROM_OMDB, moviesGetFromOmdb),
    takeLatest(USER_ACTION, userAction),
    takeLatest(VIEW, viewAction),
    takeLatest(SET_COMMENT, commentSet),
    takeLatest(GET_COMMENTS, commentsGet),
    takeLatest(ADD_MOVIE, addMovieUser),
    takeLatest(GET_MOST_POPULAR, mostPopular),
    takeLatest(GET_RELATED, relatedGet)
  ]);
}
