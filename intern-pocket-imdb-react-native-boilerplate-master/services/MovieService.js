import ApiService from "./ApiService";
import AuthService from "./AuthService";
import Axios from "axios";

const ENDPOINTS = {
  MOVIES: "/movies"
};

class MovieService extends ApiService {

  getMovies = async () => {
    var config = {
      headers: {'Authorization': "bearer " + await AuthService.getToken()}
    };
    //return Athixios.get(ENDPOINTS.MOVIES, config);
    console.log('api', this.apiClient);
    const token = await AuthService.getToken();
    console.log('token, movie servic', token);
    return this.apiClient.get(ENDPOINTS.MOVIES);
  };
}

export const movieService = new MovieService();
