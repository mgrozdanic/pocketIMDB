import { createSelector } from "reselect";

import reducers from "../reducers";

const selectMyNPagesDomain = state => state.movie || reducers;

const makeSelectMyNPages = () =>
  createSelector(selectMyNPagesDomain, substate => substate.myNPages);

export default makeSelectMyNPages;