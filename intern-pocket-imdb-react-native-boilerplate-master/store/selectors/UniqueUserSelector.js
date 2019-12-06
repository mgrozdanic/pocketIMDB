import reducers from "../reducers";
import {createSelector} from "reselect";

export const uniqueSelector = (state) => state.unique || reducers;

//state.movie

const getUniqueUserSelector = () =>
  createSelector(uniqueSelector, substate => substate.unique);

export { getUniqueUserSelector };
