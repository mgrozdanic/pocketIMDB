import { createSelector } from "reselect";

import reducers from "../reducers";

const selectMyCurrentPageDomain = state => state.movie || reducers;

const makeSelectMyCurrentPage = () =>
  createSelector(selectMyCurrentPageDomain, substate => substate.myCurrentPage);

export default makeSelectMyCurrentPage;