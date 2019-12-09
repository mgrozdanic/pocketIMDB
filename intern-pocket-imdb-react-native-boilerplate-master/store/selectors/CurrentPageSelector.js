import { createSelector } from "reselect";

import reducers from "../reducers";

const selectCurrentPageDomain = state => state.movie || reducers;

const makeSelectCurrentPage = () =>
  createSelector(selectCurrentPageDomain, substate => substate.currentPage);

export default makeSelectCurrentPage;