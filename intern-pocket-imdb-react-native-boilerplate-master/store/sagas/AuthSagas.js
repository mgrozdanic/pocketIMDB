import { call, put } from "redux-saga/effects";

import { authUser, loginError, registerError, updateUnique } from "../actions/AuthActions";
import AuthService from "../../services/AuthService";
import NavigationService from "../../services/NavigationService";

export function* userLogin({ payload }) {
  try {
    yield call(AuthService.login, payload);

    yield put(authUser(true));
    yield call(NavigationService.navigate, "AuthLoading");
  } catch (error) {
    yield put(loginError(true));
  }
}

// check if email is unique
export function* userUnique({payload}) {
  
  const response = yield call(AuthService.unique, payload);
  yield put(updateUnique(response));
}

//end

export function* userRegister({ payload }) {
  try {
    yield call(AuthService.signup, payload);

    yield call(AuthService.login, payload);
    yield put(authUser(true));
    yield call(NavigationService.navigate, "AuthLoading");
  } catch (error) {
    yield put(registerError(true));
  }
}

export function* verify({ payload }) {
  try {

    const { data } = yield call(AuthService.verify, payload);
    if (data === 'FAIL') alert('Wrong code, please try again.');
    else {
      yield put(authUser(true));
      yield call(NavigationService.navigate, "AuthLoading");
    }
  } catch (error) {
    console.log(error);
  }
}
