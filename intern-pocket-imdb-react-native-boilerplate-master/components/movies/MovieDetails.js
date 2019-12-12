import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setView, getMovies, setUserAction, setCommentAction, getRelated } from "../../store/actions/MovieActions";
import { TextInput, ScrollView } from "react-native-gesture-handler";

const MovieDetails = ({navigation}) => {

    const[comment, setComment] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRelated({genre: navigation.getParam('movie').Genre}));
        handleView();
      }, []);
    
      const handleLike = () => {
        //movie.action = "LIKE";
        dispatch(setUserAction({action: "LIKE", movieId: navigation.getParam('movie')._id}));
        dispatch(getMovies({page: 1, filter: 'All'}));
      }
    
      const handleDislike = () => {
        //movie.action = "DISLIKE";
        dispatch(setUserAction({action: "DISLIKE", movieId: navigation.getParam('movie')._id}));
        dispatch(getMovies({page: 1, filter: 'All'}));
      }

    const handleView = () => {
        dispatch(setView({movie: navigation.getParam('movie')._id}));
        dispatch(getMovies({page: 1, filter: 'All'}));
    }

    const handleSubmit = () => {
        dispatch(setCommentAction({movie: navigation.getParam('movie')._id, comment: comment}));
        setComment("");
    }

    return (
        <ScrollView>
        <View>
            <View style={{flexDirection: "row"}}>
            <Text style={styles.title}>{navigation.getParam('movie').Title}({navigation.getParam('movie').Year})</Text>
            {/* <TouchableOpacity style={styles.title} onPress={() => navigation.openDrawer()}>
                <Text style={{color:"blue", fontSize:20}}>Related</Text>
            </TouchableOpacity> */}
            </View>
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
            <Text> </Text>
            <Text style={styles.nonTitleItems}>Your thoughts:</Text>
            <TextInput multiline maxLength={500} style={{ height: 80, borderColor: 'gray'
            , borderWidth: 1, fontSize: 17, paddingHorizontal:10 }} 
            value={comment} onChangeText={text => setComment(text)}/>
            <TouchableOpacity onPress={handleSubmit} disabled={comment === ""}><Text style={styles.nonTitleItems}>Submit</Text></TouchableOpacity>
        <Comments movie={navigation.getParam('movie')._id}/>
        </View>
        </ScrollView>
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