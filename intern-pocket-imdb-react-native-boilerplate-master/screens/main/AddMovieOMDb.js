import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { getMovieFromOMDb } from '../../store/actions/MovieActions';

const AddMovieOMDb = () => {
    const dispatch = useDispatch();

    const [title, SetTitle] = useState("");
    const [year, SetYear] = useState("");

    const handleFind = () => {
        const data = {title, year};
        dispatch(getMovieFromOMDb(data));
    };

    return(
        <View style={{flexDirection:"row"}}>
            <Text>Title:</Text>
            <TextInput placeholder="e.g Titanic" value={title} onChangeText={SetTitle}></TextInput>
            <Text>Year:</Text>
            <TextInput placeholder="e.g 1997" value={year} onChangeText={SetYear}></TextInput>
            <TouchableOpacity onPress={handleFind}><Text>Find</Text></TouchableOpacity>
        </View>
    );
}

export default AddMovieOMDb;