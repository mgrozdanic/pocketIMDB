import { createStackNavigator } from "react-navigation-stack";

import MoviesItem from "../components/movies/MoviesItem";
import MovieDetails from "../components/movies/MovieDetails";

export default MovieNavigator =  createStackNavigator({
    MoviesItem,
    MovieDetails
  });