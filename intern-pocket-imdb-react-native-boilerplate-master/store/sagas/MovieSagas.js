import { call, put } from 'redux-saga/effects';

import { movieService } from '../../services/MovieService';
import { setMovies, setCurrPage, setNPages } from '../actions/MovieActions';

export function* moviesGet({payload}) {
  try {
    const { data } = yield call(movieService.getMovies, payload);
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
    const {data} = yield call(movieService.getMoviesFromOMDb, obj.payload);
    console.log("DATA\n", data);
    // end
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}
