import React from "react";
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setUserAction, getMovies } from "../../store/actions/MovieActions";

const MovieItem = ({ movie, navigation }) => {
  
  const handleNavigate = () => {
    navigation.navigate("MovieDetails", {movie});
  }

  const dispatch = useDispatch();

  const handleLike = () => {
    movie.action = "LIKE";
    dispatch(setUserAction({action: "LIKE", movieId: movie._id}));
    dispatch(getMovies({page: 1, filter: 'All', search:'All'}));
  }

  const handleDislike = () => {
    movie.action = "DISLIKE";
    dispatch(setUserAction({action: "DISLIKE", movieId: movie._id}));
    dispatch(getMovies({page: 1, filter: 'All', search:'All'}));
  }

  return(
  <TouchableOpacity onPress={handleNavigate}>
    <View style={styles.item}>
      <View style={{flexDirection:"row"}}>
      <Text style={{fontSize: 20}}>{movie.Title}</Text>
      </View>
      <View style={styles.content}>
        <Image
              style={{width: "30%", height: 100}}
              source={{uri: movie.Poster}}/>
        <Text style={styles.description}>{movie.Plot}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
      <Text style={{fontSize: 17}}>{movie.likes}</Text>
      <TouchableOpacity onPress={handleLike} disabled={movie.action === "LIKE"}><Text style={{fontSize: 17}}> Like </Text></TouchableOpacity>
      <TouchableOpacity onPress={handleDislike} disabled={movie.action === "DISLIKE"}><Text style={{fontSize: 17}}> Dislike </Text></TouchableOpacity>
      <Text style={{fontSize: 17}}>{movie.dislikes}</Text>
      <Text style={{fontSize: 17}}>  Views:{movie.views}</Text>
      <Text style={{fontSize: 17, color: "blue"}}> {movie.watched ? "Watched": ""}</Text>
      </View>
    </View>
  </TouchableOpacity>
);}

MovieItem.propTypes = {
  movie: PropTypes.object,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  item:{
    flex:1,
    flexDirection: "column",
    paddingHorizontal: 9,
    paddingVertical: 9
  },
  content: {
    flexDirection: "row"
  },
  description:{
    fontSize: 17,
    height: 100,
    paddingHorizontal: 9,
    width: "65%"
  }
});

export default MovieItem;
