import { call, put } from 'redux-saga/effects';

import { setUser } from '../actions/AuthActions';
import { movieService } from '../../services/MovieService';
import { getMovies, setMovies, setCurrPage, setNPages, omdbNotFound, setCommentsAction, commentsNewPageAction, 
  setMostPopularAction, setRelated, setWatchListAction, getWatchListAction,
  setMyCurrPage, setMyMovies, setMyNPages } from '../actions/MovieActions';
import authService from '../../services/AuthService';

export function* moviesGet({payload}) {
  try {
    const { data } = yield call(movieService.getMovies, payload);
    //console.log(data);
    if (payload.flag !== 'My'){
      yield put(setMovies(data.movies));
      // za pagination
      yield put(setCurrPage(data.currentPage));
      yield put(setNPages(data.pages));

      
    } else {
      yield put(setMyMovies(data.movies));
      // za pagination
      yield put(setMyCurrPage(data.currentPage));
      yield put(setMyNPages(data.pages));

    }
    const response = yield call(authService.getUser);
    yield put(setUser(response.user));
    // end
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* moviesGetFromOmdb(obj) {
  try {
    const { data }= yield call(movieService.getMoviesFromOMDb, obj.payload);

    if (data.Response === "False"){
      yield put(omdbNotFound("True"));
    } else {
      const response = yield call(movieService.saveMovie, data);
      yield put(getMovies({page: 1, filter: 'All', search:'All', flag: 'My'}));
      yield put(getMovies({page: 1, filter: 'All', search:'All', flag: 'All'}));
      if (response.data.Title !== undefined) alert("Movie '" + response.data.Title + "("
      + response.data.Year + ")' successfuly saved.");
      else alert("Server error.");
    }
    } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* userAction({ payload }) {
  try {
    yield call(movieService.saveAction, payload);
    yield put(yield put(getWatchListAction({title: 'All', filter: 'All'})));
    } catch (error) {

    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* viewAction({ payload }) {
  try {
    yield call(movieService.addView, payload);
    } catch (error) {

    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* commentSet({ payload }) {
  try {
    yield call(movieService.addComment, payload);
    const { data } = yield call(movieService.getComments, { movie: payload.movie, page: 1 });
    yield put(commentsNewPageAction({comments:data.comments, currentCPage: data.currentCPage, 
      nOfComments:data.nOfComments}));
    } catch (error) {

    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* commentsGet({ payload }) {
  try {
    const { data } = yield call(movieService.getComments, payload);
    console.log("DATA COMMENTS\n", data);
    if (payload.page > 1)
      yield put(commentsNewPageAction({comments:data.comments, currentCPage: data.currentCPage, 
        nOfComments:data.nOfComments}));
    else
      yield put(setCommentsAction({comments:data.comments, currentCPage: data.currentCPage, 
        nOfComments:data.nOfComments}));
    } catch (error) {

    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* addMovieUser({ payload }) {
  try {
    const { data } = yield call(movieService.saveMovie, payload);
    yield put(getMovies({page: 1, filter: 'All', search:'All', flag: 'My'}));
    yield put(getMovies({page: 1, filter: 'All', search:'All', flag: 'All'}));
    } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* mostPopular() {
  try {
    const { data } = yield call(movieService.getMostPopular);
    yield put(setMostPopularAction(data));
  } catch (error) {
    console.log({ error });
  }
}

export function* relatedGet({ payload }) {
  try {
    const { data } = yield call(movieService.getRelated, payload);
    yield put(setRelated(data));
  } catch (error) {
    console.log({ error });
  }
}

export function* actionWatchList({ payload }) {
  try {
    const { data } = yield call(movieService.watchListAddRemove, payload);
    yield put(getWatchListAction({title: 'All', filter: 'All'}));
    yield put(getMovies({page: 1, filter: 'All', search:'All', flag: 'My'}));
    yield put(getMovies({page: 1, filter: 'All', search:'All', flag: 'All'}));
  } catch (error) {
    console.log({ error });
  }
}

export function* watchListGet({ payload }) {
  try {
    const { data } = yield call(movieService.getWatchlist, payload);
    yield put(setWatchListAction(data));
    } catch (error) {
    console.log(error);
  }
}

export function* watchUnwatchMovie({ payload }) {
  try {
    const { data } = yield call(movieService.watchUnwatch, payload);
    yield put(getWatchListAction({title: 'All', filter: 'All'}));
    yield put(getMovies({page: 1, filter: 'All', search:'All', flag: 'My'}));
    yield put(getMovies({page: 1, filter: 'All', search:'All', flag: 'All'}));
    } catch (error) {
    console.log(error);
  }
}

export function* tokenSet({ payload }) {
  try {
    const { data } = yield call(movieService.setToken, payload);
  } catch (error) {
    console.log(error);
  }
}