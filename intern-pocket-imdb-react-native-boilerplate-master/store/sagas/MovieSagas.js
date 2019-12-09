import { call, put } from 'redux-saga/effects';

import { movieService } from '../../services/MovieService';
import { setMovies, setCurrPage, setNPages } from '../actions/MovieActions';

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
