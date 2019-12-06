import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


const MovieItem = ({ movie, navigation }) => {
  
  const handleNavigate = () => {
    navigation.navigate("MovieDetails");
  }
  return(
  <TouchableOpacity onPress={handleNavigate}>
    <View>
      <Text>{movie.title}</Text>
      <Text>{movie.description}</Text>
      <Image
            style={{width: 66, height: 58}}
            source={{uri: 'https://facebook.github.io/react/logo-og.png'}}/>  
    </View>
  </TouchableOpacity>
);}

MovieItem.propTypes = {
  movie: PropTypes.object,
  navigation: PropTypes.object
};
export default MovieItem;
