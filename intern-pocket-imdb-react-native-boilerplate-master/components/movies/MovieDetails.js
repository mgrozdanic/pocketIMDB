import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setView, setUserAction, setCommentAction, getRelated, watchListAction } from "../../store/actions/MovieActions";
import { TextInput, ScrollView } from "react-native-gesture-handler";

const MovieDetails = ({navigation}) => {

    const[comment, setComment] = useState("");
    const[action, setAction] = useState(navigation.getParam('movie').action);
    const[likes, setLikes] = useState(navigation.getParam('movie').likes);
    const[dislikes, setDislikes] = useState(navigation.getParam('movie').dislikes);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRelated({genre: navigation.getParam('movie').Genre}));
        handleView();
      }, []);

      const sendMessage = async to => {
        dispatch(sendNotificationAction({movie, to: movie.creator}));
      }
    
      const handleLike = () => {
        setAction("LIKE");
        setLikes(parseInt(likes) + 1);
        setDislikes(parseInt(dislikes) - 1);
        dispatch(setUserAction({action: "LIKE", movieId: navigation.getParam('movie')._id, 
            currentPage: navigation.getParam('currentPage'), wl: navigation.getParam('wl')}));
        sendMessage();
      }
    
      const handleDislike = () => {
        setAction("DISLIKE");
        setDislikes(parseInt(dislikes) + 1);
        setLikes(parseInt(likes) - 1);
        dispatch(setUserAction({action: "DISLIKE", movieId: navigation.getParam('movie')._id,
            currentPage: navigation.getParam('currentPage'), wl: navigation.getParam('wl')}));
        }

    const handleView = () => {
        let my = navigation.getParam('movie').creator === navigation.getParam('user')._id;
        dispatch(setView({movie: navigation.getParam('movie')._id, my, wl: navigation.getParam('wl') }));
    }

    const handleSubmit = () => {
        dispatch(setCommentAction({movie: navigation.getParam('movie')._id, comment: comment}));
        setComment("");
    }

    const handleAddRemoveToWatchList = () => {
        // add ili remove
        let my = navigation.getParam('movie').creator === navigation.getParam('user')._id;
        dispatch(watchListAction({movie: navigation.getParam('movie')._id, 
            action: navigation.getParam('movie').onWatchList ? 'remove' : 'add', my}));
        navigation.navigate("Home");
    }

    return (
        <ScrollView>
        <View>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.title}>{navigation.getParam('movie').Title}({navigation.getParam('movie').Year})</Text>
                <Text style={{fontSize: 20, color: "blue"}}>  {navigation.getParam('movie').watched ? "Watched": ""}</Text>
            </View>
            <Text style={{paddingHorizontal: 10}}>{navigation.getParam('movie').Genre}</Text>
            <Image
            style={{width: "100%", height: 400, paddingHorizontal: 10}}
            source={{uri: navigation.getParam('movie').Poster}}/>
            <View style={{flexDirection: "row"}}>
            <Text style={{paddingHorizontal: 10}}>{likes}</Text>
            <TouchableOpacity onPress={handleLike} disabled={action === "LIKE"}>
                <Text style={ action === "LIKE"
                    ? styles.textActionTrue : styles.textActionFalse }> Like </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDislike} disabled={action === "DISLIKE"}>
                <Text style={ action === "DISLIKE" 
                    ? styles.textActionTrue : styles.textActionFalse }> Dislike </Text>
            </TouchableOpacity>
            <Text style={{paddingHorizontal: 5}}>{dislikes}</Text>
            <Text style={{paddingHorizontal: 10}}>  Views: {parseInt(navigation.getParam('movie').views) + 1}</Text>
            </View>
                <Text> </Text>
                <View style={{flexDirection: "row"}}>
                <Text style={styles.nonTitleItems}>{navigation.getParam('movie').Plot}</Text>
            </View>
            <Text> </Text>
            <Button title={navigation.getParam('movie').onWatchList ? "Remove From Watch List" 
                : "Add To Watch List"} onPress={handleAddRemoveToWatchList}></Button>
            <Text style={styles.nonTitleItems}>Your thoughts:</Text>
            <TextInput multiline maxLength={500} style={styles.comment} 
            value={comment} onChangeText={text => setComment(text)}/>
            <TouchableOpacity onPress={handleSubmit} disabled={comment === ""}>
                <Text style={styles.nonTitleItems}>Submit</Text>
            </TouchableOpacity>
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
    },
    textActionTrue: {
      fontSize: 17,
      color: "blue"
    },
    textActionFalse: {
      fontSize: 17
    },
    comment: {
      height: 80, 
      borderColor: 'gray',
      borderWidth: 1,
      fontSize: 17, 
      paddingHorizontal:10
    }
})

MovieDetails.propTypes = {
    movie: PropTypes.object
}

export default MovieDetails;