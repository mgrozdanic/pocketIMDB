import { createSelector } from "reselect";

import reducers from "../reducers";

const selectWatchListDomain = state => state.movie || reducers;

const makeSelectWatchList = () =>
  createSelector(selectWatchListDomain, substate => substate.watchlist);

export default makeSelectWatchList;