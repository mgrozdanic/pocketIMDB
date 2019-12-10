import { SET_MOVIES, SET_N_PAGES, SET_CURR_PAGE, GET_MOVIE_FROM_OMDB, SET_MOVIE_FROM_OMDB, OMDB_NOT_FOUND } from '../actions/ActionTypes';

const initialState = {
  all: [],
  nPages: 1,
  currentPage: 1,
  omdbError: "False"
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, all: action.payload };
    case SET_N_PAGES:
      return { ...state, nPages: action.payload };
    case SET_CURR_PAGE:
      return { ...state, currentPage: action.payload };
    case OMDB_NOT_FOUND:
      return { ...state, omdbError: action.payload };
    default:
      return state;
  }
};

export default movieReducer;
