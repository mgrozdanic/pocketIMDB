import { createSelector } from "reselect";

import reducers from "../reducers";

const selectCommentsDomain = state => state.movie || reducers;

const makeSelectComments = () =>
  createSelector(selectCommentsDomain, substate => substate.comments);

export default makeSelectComments;