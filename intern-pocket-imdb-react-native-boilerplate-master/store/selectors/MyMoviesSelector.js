import { createSelector } from "reselect";

import reducers from "../reducers";

const selectMoviesDomain = state => state.movie || reducers;

const makeSelectMyMovies = () =>
  createSelector(selectMoviesDomain, substate => substate);

const makeSelectMyMoviesList = () =>
  createSelector(selectMoviesDomain, substate => substate.myAll);

export default makeSelectMyMovies;

export { makeSelectMyMoviesList };
