import React, { useEffect, useState, createRef } from "react";
import { StyleSheet, View, Text, Picker } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addHeaderLeftNavigator } from "../../helpers";
import { getMovies, filterAction } from "../../store/actions/MovieActions";
import { makeSelectMoviesList } from "../../store/selectors/MoviesSelector";
import MoviesList from "../../components/movies/MoviesList";
import makeSelectCurrentPage from "../../store/selectors/CurrentPageSelector";
import makeSelectNPages from "../../store/selectors/NumberOfPages";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import ModalDropdown from 'react-native-modal-dropdown';
import DelayInput from 'react-native-debounce-input';

const Home = ({navigation}) => {
  navigationOptions = ({ navigation }) => {
    const headerLeftNav = addHeaderLeftNavigator(navigation);
    return { ...headerLeftNav, title: "Home" };
  };

  const [search, setSearch] = useState("");

  const [cPage, SetCPage] = useState(1);

  const dispatch = useDispatch();

  const handleMoviesGet = data => dispatch(getMovies({page: data, filter: 'All', search:'All'}));

  const movies = useSelector(makeSelectMoviesList());
  const currentPage = useSelector(makeSelectCurrentPage());
  const nPages = useSelector(makeSelectNPages());

  const handlePrevious = () => dispatch(getMovies({page: parseInt(currentPage) - 1, filter: 'All', search:'All'}));
  const handleNext = () => dispatch(getMovies({page: parseInt(currentPage) + 1, filter: 'All', search:'All'}));

  const handleAddMovieOMDb = () => navigation.navigate("AddMovieOMDb");

  const handleAddMovie = () => navigation.navigate("AddMovie");

  const inputRef = createRef();

  const handleFilter = (index, value) => {
    dispatch(getMovies({page: 1, filter: value, search:'All'}));
  }

  const handleSearch = (text) => {
    console.log("\n\n" + text);
    if (text !== ""){
      dispatch(getMovies({page:1, filter:'All', search:text}));
    }
  }

  useEffect(() => {
    handleMoviesGet(cPage);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={handleAddMovieOMDb}>
          <Text>Add Movie OMDb </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddMovie}>
          <Text>Add Movie </Text>
        </TouchableOpacity>
        <ModalDropdown textStyle={{fontSize:14}} options={['All', 'Action', 'Adult', 'Adventure', 'Animation',
        'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film Noir',
        'Game-Show', 'History', 'Horror', 'Musical', 'Music', 'Mystery', 'News', 'Reality-TV', 
        'Romance', 'Sci-Fi', 'Short', 'Sport', 'Talk-Show', 'Thriller', 'War', 'Western']} 
          onSelect={(index, value) => handleFilter(index, value)} />
      </View>
      <DelayInput minLength={3} inputRef={inputRef} onChangeText={(text) => handleSearch(text)} 
        delayTimeout={750} placeholder="Search..."/>
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
