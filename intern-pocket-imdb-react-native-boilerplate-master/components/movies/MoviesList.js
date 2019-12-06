import React from "react";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";

import MovieItem from "./MoviesItem";

const MoviesList = ({ movies, navigation }) => {
  const renderMovie = movie => (
    <MovieItem navigation={navigation} key={movie.id} movie={movie}></MovieItem>
  );

  return <ScrollView>{movies.map(renderMovie)}</ScrollView>;
};

MoviesList.propTypes = {
  movies: PropTypes.array,
  navigation: PropTypes.object
};

export default MoviesList;
