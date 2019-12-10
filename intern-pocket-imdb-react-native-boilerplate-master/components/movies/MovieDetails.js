import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setView, getMovies } from "../../store/actions/MovieActions";

const MovieDetails = ({navigation}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        handleView();
      }, []);
    
    const handleView = () => {
        dispatch(setView({movie: navigation.getParam('movie')._id}));
        dispatch(getMovies(1));
    }

    return (
        <View>
            <Text>{navigation.getParam('movie').Title}</Text>
            <Text>{navigation.getParam('movie').Plot}</Text>
            <Image
            style={{width: 66, height: 58}}
            source={{uri: navigation.getParam('movie').Poster}}/>
        </View>
    )
}

MovieDetails.propTypes = {
    movie: PropTypes.object
}

export default MovieDetails;