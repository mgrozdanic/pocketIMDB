import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addHeaderLeftNavigator } from "../../helpers";
import { getMovies } from "../../store/actions/MovieActions";
import { makeSelectMoviesList } from "../../store/selectors/MoviesSelector";
import MoviesList from "../../components/movies/MoviesList";
import makeSelectCurrentPage from "../../store/selectors/CurrentPageSelector";
import makeSelectNPages from "../../store/selectors/NumberOfPages";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({navigation}) => {
  navigationOptions = ({ navigation }) => {
    const headerLeftNav = addHeaderLeftNavigator(navigation);
    return { ...headerLeftNav, title: "Home" };
  };

  const [cPage, SetCPage] = useState(1);

  const dispatch = useDispatch();

  const handleMoviesGet = data => dispatch(getMovies(data));

  const movies = useSelector(makeSelectMoviesList());
  const currentPage = useSelector(makeSelectCurrentPage());
  const nPages = useSelector(makeSelectNPages());

  const handlePrevious = () => dispatch(getMovies(parseInt(currentPage) - 1));
  const handleNext = () => dispatch(getMovies(parseInt(currentPage) + 1));

  const handleAddMovieOMDb = () => navigation.navigate("AddMovieOMDb");

  useEffect(() => {
    handleMoviesGet(cPage);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={handleAddMovieOMDb}>
          <Text>Add Movie</Text>
        </TouchableOpacity>
      </View>
      <MoviesList navigation={navigation} movies={movies}></MoviesList>
      <View style={{alignItems:"center", flexDirection:"row"}}>
      <TouchableOpacity disabled={currentPage == 1} onPress={handlePrevious}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <Text>  Page {currentPage} of {nPages}  </Text>
      <TouchableOpacity disabled={currentPage == nPages} onPress={handleNext}>
        <Text>Next</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});
