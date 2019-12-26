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
  GET_RELATED: "/movies/related",
  WATCHLIST_ADD_REMOVE: "/movies/watchlist",
  WATCHLIST_GET: "/movies/mywatchlist/",
  WATCH_UNWATCH: "/movies/watchunwatch",
  TOKEN: "/movies/token",
  REMOVE_TOKEN: "/movies/removetoken",
  NOTIFICATION: "/movies/notification",
  OLD_NOTIFICATIONS: "/movies/oldnotification",
  GET_POSITION: "/movies/position",
  GET_POSITION_MY: "/movies/positionmy"
};

class MovieService extends ApiService {

  getMovies = async (movie) => {
    var config = {
      headers: {'Authorization': "bearer " + await AuthService.getToken()}
    };
    //return Athixios.get(ENDPOINTS.MOVIES, config);
    const token = await AuthService.getToken();
    return this.apiClient.get(ENDPOINTS.MOVIES + movie.page + "/" + movie.filter + "/" + movie.search 
      + "/" + movie.flag);
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

  watchListAddRemove = async(payload) => {
    const response = this.apiClient.post(ENDPOINTS.WATCHLIST_ADD_REMOVE, payload);
    return response;
  }

  getWatchlist = async(payload) => {
    if (payload.title === "") payload.title = "All"
    const response = this.apiClient.get(ENDPOINTS.WATCHLIST_GET + payload.title + "/" + payload.filter);
    return response;
  }

  watchUnwatch = async(payload) => {
    const response = this.apiClient.post(ENDPOINTS.WATCH_UNWATCH, payload);
    return response;
  }

  setToken = async(payload) => {
    const response = this.apiClient.post(ENDPOINTS.TOKEN, payload);
    return response;
  }

  removeToken = async payload => {
    const response = this.apiClient.delete(ENDPOINTS.REMOVE_TOKEN, payload);
    return response;
  }

  sendNotification = async(payload) => {
    const response = this.apiClient.post(ENDPOINTS.NOTIFICATION, payload);
    return response;
  }

  getOldNotifications = async() => {
    const response = this.apiClient.get(ENDPOINTS.OLD_NOTIFICATIONS);
    return response;
  }

  getPosition = async(payload) => {
    const response = this.apiClient.get(ENDPOINTS.GET_POSITION + "/" + payload);
    return response;
  }

  getPositionMy = async(payload) => {
    const response = this.apiClient.get(ENDPOINTS.GET_POSITION_MY + "/" + payload);
    return response;
  }

}

export const movieService = new MovieService();