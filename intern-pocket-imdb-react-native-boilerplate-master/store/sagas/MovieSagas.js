import { call, put } from 'redux-saga/effects';

import { movieService } from '../../services/MovieService';
import { setMovies, setCurrPage, setNPages, omdbNotFound } from '../actions/MovieActions';

export function* moviesGet({payload}) {
  try {
    const { data } = yield call(movieService.getMovies, payload);
    console.log(data);
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
    const { data } = yield call(movieService.saveAction, payload);
    } catch (error) {

    console.log({ error }); /*eslint-disable-line*/
  }
}
