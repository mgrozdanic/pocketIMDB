import { createSelector } from "reselect";

import reducers from "../reducers";

const selectCommentsCurrentPageDomain = state => state.movie || reducers;

const makeSelectCommentsCurrentPage = () =>
  createSelector(selectCommentsCurrentPageDomain, substate => substate.currentCPage);

export default makeSelectCommentsCurrentPage;