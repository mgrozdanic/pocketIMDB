import { LOGIN, AUTH_USER, REGISTER, LOGIN_ERROR, REGISTER_ERROR, CHCK_UNIQUE, CHECK_UNIQUE_SUCCESS } from './ActionTypes';

export const logIn = logInData => {
  return {
    type: LOGIN,
    payload: logInData
  };
};

export const register = registerData => {
  return {
    type: REGISTER,
    payload: registerData
  };
};

// checking if email is unique

export const unique = email => {
  return {
    type: CHCK_UNIQUE,
    payload: email
  }
}

export const updateUnique = payload => {
  return {
    type: CHECK_UNIQUE_SUCCESS,
    payload
  }
}

// end

export const authUser = payload => {
  return {
    type: AUTH_USER,
    payload
  };
};

export const loginError = payload => {
  return {
    type: LOGIN_ERROR,
    payload
  };
};

export const registerError = payload => {
  return {
    type: REGISTER_ERROR,
    payload
  };
};
