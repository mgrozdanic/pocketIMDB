import React from 'react';
import PropTypes from "prop-types";
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Related = ({ navigation }) => {

    const movies = [{Title: "It"}, {Title: "Film 1"}, {Title: "Film 2"}];

    const handleSinglePage = (movie) => {
        navigation.navigate("MovieDetails", {movie});
    }

    return (
    <View>
        <Text style={{paddingHorizontal: 10, alignSelf:"center", fontSize: 17}}>Related:</Text>
        {movies.map((movie) => (
                <TouchableOpacity onPress={() => handleSinglePage(movie)} 
                style={{paddingHorizontal: 10, alignSelf:"center"}}>
                    <Text>{movie.Title}</Text>
                </TouchableOpacity>
            )
        )}
    </View>);
};

Related.propTypes = {
    navigation: PropTypes.object
  };

export default Related;