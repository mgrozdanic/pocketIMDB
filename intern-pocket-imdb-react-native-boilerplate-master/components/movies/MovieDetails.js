import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setView, getMovies, setUserAction } from "../../store/actions/MovieActions";

const MovieDetails = ({navigation}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        handleView();
      }, []);
    
      const handleLike = () => {
        //movie.action = "LIKE";
        dispatch(setUserAction({action: "LIKE", movieId: navigation.getParam('movie')._id}));
        dispatch(getMovies(1));
      }
    
      const handleDislike = () => {
        //movie.action = "DISLIKE";
        dispatch(setUserAction({action: "DISLIKE", movieId: navigation.getParam('movie')._id}));
        dispatch(getMovies(1));
      }

    const handleView = () => {
        dispatch(setView({movie: navigation.getParam('movie')._id}));
        dispatch(getMovies(1));
    }

    return (
        <View>
            <Text style={styles.title}>{navigation.getParam('movie').Title}({navigation.getParam('movie').Year})</Text>
            <Text style={{paddingHorizontal: 10}}>{navigation.getParam('movie').Genre}</Text>
            <Image
            style={{width: "100%", height: 400, paddingHorizontal: 10}}
            source={{uri: navigation.getParam('movie').Poster}}/>
            <View style={{flexDirection: "row"}}>
            <Text style={{paddingHorizontal: 10}}>{navigation.getParam('movie').likes}</Text>
            <TouchableOpacity onPress={handleLike} disabled={navigation.getParam('movie').action === "LIKE"}>
                <Text style={{paddingHorizontal: 5}}> Like </Text></TouchableOpacity>
            <TouchableOpacity onPress={handleDislike} disabled={navigation.getParam('movie').action === "DISLIKE"}>
                <Text style={{paddingHorizontal: 5}}> Dislike </Text></TouchableOpacity>
            <Text style={{paddingHorizontal: 5}}>{navigation.getParam('movie').dislikes}</Text>
            <Text style={{paddingHorizontal: 10}}>  Views: {navigation.getParam('movie').views}</Text>
            </View>
            <Text> </Text>
            <View style={{flexDirection: "row"}}>
            <Text style={styles.nonTitleItems}>{navigation.getParam('movie').Plot}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nonTitleItems: {
        fontSize: 17,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 20,
        paddingHorizontal: 10
    }
})

MovieDetails.propTypes = {
    movie: PropTypes.object
}

export default MovieDetails;