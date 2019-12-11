import React from 'react';
import { View, Text } from "react-native";

const Comment = ({comment}) => {
    return(
        <View>
            <Text>{comment.user} says:</Text>
            <Text>{comment.text}</Text>
        </View>
    );
}

export default Comment;