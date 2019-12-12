import { createSelector } from "reselect";

import reducers from "../reducers";

const selectMostPopularDomain = state => state.movie || reducers;

const makeSelectMostPopular = () =>
  createSelector(selectMostPopularDomain, substate => substate.mostPopular);

export default makeSelectMostPopular;