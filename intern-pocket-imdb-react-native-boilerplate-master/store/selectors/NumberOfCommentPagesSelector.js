import { createSelector } from "reselect";

import reducers from "../reducers";

const selectNPagesCommentDomain = state => state.movie || reducers;

const makeSelectNPagesComments = () =>
  createSelector(selectNPagesCommentDomain, substate => substate.nOfComments);

export default makeSelectNPagesComments;