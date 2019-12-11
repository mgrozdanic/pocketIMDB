import ApiService from "./ApiService";
import AuthService from "./AuthService";
import axios from "axios";

const ENDPOINTS = {
  MOVIES: "/movies/",
  SAVE_MOVIE: "/movies",
  SAVE_ACTION: "/movies/action",
  SAVE_VIEW: "/movies/view",
  SAVE_COMMENT: "/movies/comment"
};

class MovieService extends ApiService {

  getMovies = async (page = 1) => {
    var config = {
      headers: {'Authorization': "bearer " + await AuthService.getToken()}
    };
    //return Athixios.get(ENDPOINTS.MOVIES, config);
    const token = await AuthService.getToken();
    return this.apiClient.get(ENDPOINTS.MOVIES + page);
  };

  getMoviesFromOMDb = async (movie) => {
    const response = await axios.get("http://www.omdbapi.com/?t=" + movie.title 
    + "&y=" + movie.year + "&apikey=4670f4e7");
    return response;
  };

  saveMovie = async (movie) => {
    const response = this.apiClient.post(ENDPOINTS.SAVE_MOVIE, movie);
    return response;
  };

  saveAction = async (action) => {
    const response = this.apiClient.post(ENDPOINTS.SAVE_ACTION, action);
    return response;
  };

  addView = async (movie) => {
    const response = this.apiClient.post(ENDPOINTS.SAVE_VIEW, movie);
    return response;
  };

  addComment = async (comment) => {
    const response = this.apiClient.post(ENDPOINTS.SAVE_COMMENT, comment);
    return response;
  };
}

export const movieService = new MovieService();
