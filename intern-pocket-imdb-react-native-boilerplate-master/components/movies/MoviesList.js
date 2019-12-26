import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import MovieItem from "./MoviesItem";

const MoviesList = ({ movies, navigation }) => {
  const renderMovie = movie => (
    <MovieItem style={styles.item} navigation={navigation} key={movie.id} movie={movie} ></MovieItem>
  );

  return <ScrollView>{movies.map(renderMovie)}</ScrollView>;
};

MoviesList.propTypes = {
  movies: PropTypes.array,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
  }
})

export default MoviesList;
