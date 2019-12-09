import ApiService from "./ApiService";
import AuthService from "./AuthService";
import axios from "axios";

const ENDPOINTS = {
  MOVIES: "/movies/",
  OMDB: "http://www.omdbapi.com/"
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
    return await axios.get(ENDPOINTS.OMDB + "?apikey=4670f4e&t=" + movie.title + "&y=" + movie.year);
  };
}

export const movieService = new MovieService();
