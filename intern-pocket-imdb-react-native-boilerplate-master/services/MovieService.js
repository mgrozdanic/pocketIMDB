import ApiService from "./ApiService";
import AuthService from "./AuthService";
import axios from "axios";

const ENDPOINTS = {
  MOVIES: "/movies/",
  SAVE_MOVIE: "/movies",
  SAVE_ACTION: "/movies/action",
  SAVE_VIEW: "/movies/view",
  SAVE_COMMENT: "/movies/comment",
  GET_COMMENTS: "/movies/comments/",
  FILTER: "/movies/filter/",
  MOST_POPULAR: "/movies/mostpopular",
  GET_RELATED: "/movies/related"
};

class MovieService extends ApiService {

  getMovies = async (movie) => {
    var config = {
      headers: {'Authorization': "bearer " + await AuthService.getToken()}
    };
    //return Athixios.get(ENDPOINTS.MOVIES, config);
    const token = await AuthService.getToken();
    return this.apiClient.get(ENDPOINTS.MOVIES + movie.page + "/" + movie.filter + "/" + movie.search);
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

  getComments = async (payload) => {
    const response = this.apiClient.post(ENDPOINTS.GET_COMMENTS, payload);
    return response;
  };

  filterMovies = async (payload) => {
    const response = this.apiClient.get(ENDPOINTS.FILTER + payload);
    return response;
  }

  getMostPopular = async () => {
    const response = this.apiClient.get(ENDPOINTS.MOST_POPULAR);
    return response;
  }

  getRelated = async(payload) => {
    const response = this.apiClient.post(ENDPOINTS.GET_RELATED, payload);
    return response;
  }

}

export const movieService = new MovieService();