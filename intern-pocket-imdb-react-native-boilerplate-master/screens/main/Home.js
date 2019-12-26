import React, { useEffect, useState, createRef } from "react";
import { StyleSheet, View, Text, Picker, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addHeaderLeftNavigator } from "../../helpers";
import { getMoviesAll, getMoviesMy } from "../../store/actions/MovieActions";
import { makeSelectMoviesList } from "../../store/selectors/MoviesSelector";
import MoviesList from "../../components/movies/MoviesList";
import makeSelectCurrentPage from "../../store/selectors/CurrentPageSelector";
import makeSelectNPages from "../../store/selectors/NumberOfPages";
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalDropdown from 'react-native-modal-dropdown';
import DelayInput from 'react-native-debounce-input';
import makeSelectMyCurrentPage from "../../store/selectors/MyCurrentPageSelector";

export const client = new WebSocket("ws://10.0.46.140:8999");

const Home = ({navigation}) => {

  const [search, setSearch] = useState("");

  const [cPage, SetCPage] = useState(1);

  const dispatch = useDispatch();

  const handleMoviesGet = data => {
    dispatch(getMoviesAll({page: data, filter: 'All', search:'All', flag: 'All'}));
    dispatch(getMoviesMy({page: data, filter: 'All', search:'All', flag: 'All'}));
  }

  const movies = useSelector(makeSelectMoviesList());
  const currentPage = useSelector(makeSelectCurrentPage());
  const myCurrentPage = useSelector(makeSelectMyCurrentPage());
  const nPages = useSelector(makeSelectNPages());

  const handlePrevious = () => dispatch(getMoviesAll({page: parseInt(currentPage) - 1, filter: 'All', search:'All', flag: 'All'}));
  const handleNext = () => dispatch(getMoviesAll({page: parseInt(currentPage) + 1, filter: 'All', search:'All', flag: 'All'}));

  const handleAddMovieOMDb = () => navigation.navigate("AddMovieOMDb");

  const handleAddMovie = () => navigation.navigate("AddMovie");

  const inputRef = createRef();

  const handleFilter = (index, value) => {
    dispatch(getMoviesAll({page: 1, filter: value, search:'All', flag: 'All'}));
  }

  const handleSearch = (text) => {
    console.log("\n\n" + text);
    if (text !== ""){
      dispatch(getMoviesAll({page:1, filter:'All', search:text, flag: 'All'}));
    }
  }

  useEffect(() => {
    handleMoviesGet(cPage);
    client.onmessage = (message) => {
      message.data === "MOVIE_ADDED" && movies.length <= 9 ? handleMoviesGet(cPage) : null;
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row", alignSelf:"center"}}>
        <Button title="Add Movie OMDb" onPress={handleAddMovieOMDb} />
        <Button title="Add Movie" onPress={handleAddMovie} />
      </View>
      <View style={{flexDirection:"row", alignSelf:"center"}} >
        <ModalDropdown textStyle={{fontSize:14}} options={['All', 'Action', 'Adult', 'Adventure', 'Animation',
          'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film Noir',
          'Game-Show', 'History', 'Horror', 'Musical', 'Music', 'Mystery', 'News', 'Reality-TV', 
          'Romance', 'Sci-Fi', 'Short', 'Sport', 'Talk-Show', 'Thriller', 'War', 'Western']} 
            onSelect={(index, value) => handleFilter(index, value)} />
        <DelayInput minLength={3} inputRef={inputRef} onChangeText={(text) => handleSearch(text)} 
          delayTimeout={750} placeholder="Search..."/>
      </View>
      <MoviesList navigation={navigation} movies={movies} currentPage={currentPage} 
        myCurrentPage={myCurrentPage} ></MoviesList>
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

Home.navigationOptions = ({ navigation }) => {
  const headerLeftNav = addHeaderLeftNavigator(navigation);
  return { ...headerLeftNav, title: "Home", tabBarOnPress({ navigation, defaultHandler }) {
    Home.handleMoviesGet(1);
    defaultHandler();
  } };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});
