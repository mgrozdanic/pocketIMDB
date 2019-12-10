import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MovieItem = ({ movie, navigation }) => {
  
  const handleNavigate = () => {
    navigation.navigate("MovieDetails", {movie});
  }
  return(
  <TouchableOpacity onPress={handleNavigate}>
    <View style={styles.item}>
      <Text style={{fontSize: 20}}>{movie.Title}</Text>
      <View style={styles.content}>
        <Image
              style={{width: "30%", height: 100}}
              source={{uri: movie.Poster}}/>
        <Text style={styles.description}>{movie.Plot}</Text>
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
