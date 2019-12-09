import ApiService from "./ApiService";
import AuthService from "./AuthService";
import Axios from "axios";

const ENDPOINTS = {
  MOVIES: "/movies/"
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
}

export const movieService = new MovieService();
