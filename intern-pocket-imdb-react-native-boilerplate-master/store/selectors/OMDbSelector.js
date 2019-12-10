import { createSelector } from "reselect";

import reducers from "../reducers";

const selectOMDbDomain = state => state.movie || reducers;

const makeSelectOMDbError = () =>
  createSelector(selectOMDbDomain, substate => substate.omdbError);

const makeSelectOMDbMovie = () =>
  createSelector(selectOMDbDomain, substate => substate.omdbMovie);

export default makeSelectOMDbMovie;

export { makeSelectOMDbError };
