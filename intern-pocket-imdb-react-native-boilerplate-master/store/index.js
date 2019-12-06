import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import combineReducers from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;
