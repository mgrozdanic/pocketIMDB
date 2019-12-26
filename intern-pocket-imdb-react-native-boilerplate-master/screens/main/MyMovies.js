import React, { useEffect, useState, createRef } from "react";
import { StyleSheet, View, Text, Picker, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addHeaderLeftNavigator } from "../../helpers";
import { getMovies, filterAction, getMoviesMy } from "../../store/actions/MovieActions";
import { makeSelectMyMoviesList } from "../../store/selectors/MyMoviesSelector";
import MoviesList from "../../components/movies/MoviesList";
import makeSelectMyCurrentPage from "../../store/selectors/MyCurrentPageSelector";
import makeSelectMyNPages from "../../store/selectors/MyNumberOfPagesSelector";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import ModalDropdown from 'react-native-modal-dropdown';
import DelayInput from 'react-native-debounce-input';
import makeSelectCurrentPage from "../../store/selectors/CurrentPageSelector";
// import { NavigationEvents } from 'react-navigation';

const MyMovies = ({navigation}) => {
  
    const [cPage, SetCPage] = useState(1);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleMoviesGet = data => dispatch(getMoviesMy({page: data, filter: 'All', search:'All', flag: 'My'}));

  const movies = useSelector(makeSelectMyMoviesList());
  const currentPage = useSelector(makeSelectMyCurrentPage());
  const nPages = useSelector(makeSelectMyNPages());
  const currentPageAll = useSelector(makeSelectCurrentPage());

  const handlePrevious = () => dispatch(getMoviesMy({page: parseInt(currentPage) - 1, filter: 'All', search:'All', flag: 'My'}));
  const handleNext = () => dispatch(getMoviesMy({page: parseInt(currentPage) + 1, filter: 'All', search:'All', flag: 'My'}));

  const handleAddMovieOMDb = () => navigation.navigate("AddMovieOMDb");

  const handleAddMovie = () => navigation.navigate("AddMovie");

  const inputRef = createRef();

  const handleFilter = (index, value) => {
    dispatch(getMoviesMy({page: 1, filter: value, search:'All', flag: 'My'}));
  }

  const handleSearch = (text) => {
    console.log("\n\n" + text);
    if (text !== ""){
      dispatch(getMoviesMy({page:1, filter:'All', search:text, flag: 'My'}));
    }
  }

  useEffect(() => {
    handleMoviesGet(cPage);
  }, []);

  return (
    <View style={styles.container}>
        {/* <NavigationEvents onDidFocus={ handleMoviesGet(cPage)} 
        onWillFocus={payload => console.log('will focus', payload)}
        onWillBlur={payload => console.log('will blur', payload)}
        onDidBlur={payload => console.log('did blur', payload)}
        /> */}
      <View style={{flexDirection:"row", alignSelf:"center"}} >
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
      <MoviesList navigation={navigation} movies={movies} 
        currentPage={currentPageAll} myCurrentPage={currentPage} ></MoviesList>
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

MyMovies.propTypes = {
  navigation: PropTypes.object
};

export default MyMovies;

MyMovies.navigationOptions = ({ navigation }) => {
    const headerLeftNav = addHeaderLeftNavigator(navigation);
    return { ...headerLeftNav, title: "My Movies", tabBarOnPress({ navigation, defaultHandler }) {
        handleMoviesGet(1);
        defaultHandler();
      } };    
  };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});
