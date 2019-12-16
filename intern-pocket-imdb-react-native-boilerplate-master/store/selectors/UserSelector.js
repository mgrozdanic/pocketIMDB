import { createSelector } from "reselect";

import reducers from "../reducers";

const selectUserDomain = state => state.authUser || reducers;

const makeSelectUser = () =>
  createSelector(selectUserDomain, substate => substate.user);

export default makeSelectUser;