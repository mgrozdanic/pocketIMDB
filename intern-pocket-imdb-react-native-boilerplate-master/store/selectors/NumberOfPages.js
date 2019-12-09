import { createSelector } from "reselect";

import reducers from "../reducers";

const selectNPagesDomain = state => state.movie || reducers;

const makeSelectNPages = () =>
  createSelector(selectNPagesDomain, substate => substate.nPages);

export default makeSelectNPages;