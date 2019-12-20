import { SET_MOVIES, SET_N_PAGES, SET_CURR_PAGE, OMDB_NOT_FOUND,
  SET_COMMENTS, 
  COMMENTS_NEW_PAGE,
  SET_MOST_POPULAR,
  SET_RELATED,
  SET_WATCHLIST,
  SET_MY_MOVIES,
  SET_MY_N_PAGES,
  SET_MY_CURR_PAGE} from '../actions/ActionTypes';

const initialState = {
  all: [],
  nPages: 1,
  currentPage: 1,
  omdbError: "False",
  comments: [],
  nOfComments: 0,
  currentCPage: 1,
  mostPopular: [],
  related: [],
  watchlist: [],
  myAll: [],
  myNPages: 1,
  myCurrentPage: 1
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
    case SET_COMMENTS:
      return { ...state, comments: action.payload.comments, 
        nOfComments: action.payload.nOfComments, currentCPage: action.payload.currentCPage};
    case COMMENTS_NEW_PAGE:
      return { ...state, comments: [ ...state.comments, ...action.payload.comments], 
        nOfComments: action.payload.nOfComments, currentCPage: action.payload.currentCPage};
    case SET_MOST_POPULAR:
      return { ...state, mostPopular: action.payload };
    case SET_RELATED:
      return { ...state,  related: action.payload };
    case SET_WATCHLIST:
      return { ...state,  watchlist: action.payload };
    case SET_MY_MOVIES:
      return { ...state, myAll: action.payload };
    case SET_MY_N_PAGES:
      return { ...state, myNPages: action.payload };
    case SET_MY_CURR_PAGE:
      return { ...state, myCurrentPage: action.payload };
    default:
      return state;
  }
};

export default movieReducer;
