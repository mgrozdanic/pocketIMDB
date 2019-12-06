import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN, REGISTER, GET_MOVIES, CHCK_UNIQUE } from '../actions/ActionTypes';
import { userLogin, userRegister, userUnique } from './AuthSagas';
import { moviesGet } from './MovieSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    // checking if email is unique
    takeLatest(CHCK_UNIQUE, userUnique),
    // end
    takeLatest(REGISTER, userRegister),
    takeLatest(GET_MOVIES, moviesGet)
  ]);
}
