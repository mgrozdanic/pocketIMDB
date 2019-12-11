import React, { useEffect } from 'react';
import Comment from './Comment';
import { ScrollView } from 'react-native-gesture-handler';

const Comments = ({movie}) => {

    useEffect(() => {
        handleComments(1);
      }, []);

    const handleComments = (page) => {

    }

    let commentsList = [
    {
        id: 1,
        text: "Text",
        user: "user@gmail.com"
    },
    {
        id: 2,
        text: "Text1",
        user: "user1@gmail.com"
    },
    {
        id: 3,
        text: "Text2",
        user: "user2@gmail.com"
    }];

    const renderMovie = comment => (
        <Comment key={comment.id} comment={comment}></Comment>
    );
    return <ScrollView>{commentsList.map(renderMovie)}</ScrollView>;
}

export default Comments;