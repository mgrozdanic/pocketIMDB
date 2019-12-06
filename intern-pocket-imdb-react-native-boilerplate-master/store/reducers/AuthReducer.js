import { AUTH_USER, CHECK_UNIQUE_SUCCESS } from "../actions/ActionTypes";

const authReducer = (state = false, action) => {
  console.log(action.type);
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    case CHECK_UNIQUE_SUCCESS:
      return { ...state, unique:action.payload};
    default:
      return state;
  }
};

export default authReducer;
