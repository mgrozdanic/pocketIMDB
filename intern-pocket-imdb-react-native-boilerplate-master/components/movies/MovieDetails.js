import React from "react";
import { Text, View, Image } from "react-native";
import PropTypes from "prop-types";


const MovieDetails = ({navigation}) => {
    return (
        <View>
            <Text>{navigation.getParam('movie').title}</Text>
            <Text>{navigation.getParam('movie').description}</Text>
            <Image
            style={{width: 66, height: 58}}
            source={{uri: navigation.getParam('movie').imageUrl}}/>
        </View>
    )
}

MovieDetails.propTypes = {
    movie: PropTypes.object
}

export default MovieDetails;