import { AUTH_USER, CHECK_UNIQUE_SUCCESS, SET_USER } from "../actions/ActionTypes";

const initialState = {
  authUser: false,
  unique: false,
  user: {}
}

const authReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authUser: action.payload };
    case CHECK_UNIQUE_SUCCESS:
      return { ...state, unique: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default authReducer;
