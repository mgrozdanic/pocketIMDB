import { createSelector } from "reselect";

import reducers from "../reducers";

const selectRelatedDomain = state => state.movie || reducers;

const makeSelectRelated = () =>
  createSelector(selectRelatedDomain, substate => substate.related);

export default makeSelectRelated;