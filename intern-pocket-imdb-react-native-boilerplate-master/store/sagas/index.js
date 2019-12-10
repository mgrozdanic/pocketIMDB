import { all, takeLatest, take } from 'redux-saga/effects';
import { LOGIN, REGISTER, GET_MOVIES, CHCK_UNIQUE, GET_MOVIE_FROM_OMDB, USER_ACTION, VIEW } from '../actions/ActionTypes';
import { userLogin, userRegister, userUnique } from './AuthSagas';
import { moviesGet, moviesGetFromOmdb, userAction, viewAction } from './MovieSagas';

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
    takeLatest(VIEW, viewAction)
  ]);
}
