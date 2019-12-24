import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setUserAction, getMoviesAll, sendNotificationAction, getMoviesMy } from "../../store/actions/MovieActions";
import makeSelectUser from "../../store/selectors/UserSelector";

const MovieItem = ({ movie, navigation, currentPage }) => {

  const handleNavigate = (user) => {
    navigation.navigate("MovieDetails", {movie, currentPage, user, wl: false });
  }

  const user = useSelector(makeSelectUser());
  const dispatch = useDispatch();

  const sendMessage = async to => {
    dispatch(sendNotificationAction({movie, to: movie.creator}));
  }

  const handleLike = () => {
    movie.action = "LIKE";
    dispatch(setUserAction({action: "LIKE", movieId: movie._id, 
      currentPage, my: user._id === movie.creator, wl: false}));
    sendMessage();
  }

  const handleDislike = () => {
    movie.action = "DISLIKE";
    dispatch(setUserAction({action: "DISLIKE", movieId: movie._id,
      currentPage, my: user._id === movie.creator, wl: false}));
  }

  return(
  <TouchableOpacity onPress={() => handleNavigate(user)}>
    <View style={styles.item}>
      <View style={{flexDirection:"row"}}>
      <Text style={styles.title}>{movie.Title}</Text>
      </View>
      <View style={styles.content}>
        <Image
              style={{width: "30%", height: 100}}
              source={{uri: movie.Poster}}/>
        <Text style={styles.description}>{movie.Plot}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
      <Text style={styles.textActionFalse}>{movie.likes}</Text>
      <TouchableOpacity onPress={handleLike} disabled={movie.action === "LIKE"}>
        <Text style={ movie.action === "LIKE" ? styles.textActionTrue : styles.textActionFalse }> Like </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDislike} disabled={movie.action === "DISLIKE"}>
        <Text style={ movie.action === "DISLIKE" ? styles.textActionTrue : styles.textActionFalse }> Dislike </Text>
      </TouchableOpacity>
      <Text style={styles.textActionFalse}>{movie.dislikes}</Text>
      <Text style={styles.textActionFalse}>  Views:{movie.views}</Text>
      <Text style={styles.textActionTrue}> {movie.watched ? "Watched": ""}</Text>
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
  },
  textActionTrue: {
    fontSize: 17,
    color: "blue"
  },
  textActionFalse: {
    fontSize: 17
  },
  title: {
    fontSize: 20
  }
});

export default MovieItem;
