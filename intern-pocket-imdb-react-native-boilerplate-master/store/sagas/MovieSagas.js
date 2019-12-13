import { call, put } from 'redux-saga/effects';

import { movieService } from '../../services/MovieService';
import { setMovies, setCurrPage, setNPages, omdbNotFound, setCommentsAction, commentsNewPageAction, 
  setMostPopularAction, setRelated, setWatchListAction } from '../actions/MovieActions';

export function* moviesGet({payload}) {
  try {
    const { data } = yield call(movieService.getMovies, payload);
    //console.log(data);
    yield put(setMovies(data.movies));
    // za pagination
    yield put(setCurrPage(data.currentPage));
    yield put(setNPages(data.pages));
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
  } catch (error) {
    console.log({ error });
  }
}

export function* watchListGet({ payload }) {
  try {
    const { data } = yield call(movieService.getWatchlist);
    yield put(setWatchListAction(data));
    } catch (error) {
    console.log(error);
  }
}