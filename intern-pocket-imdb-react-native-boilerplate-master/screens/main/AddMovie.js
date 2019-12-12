import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { addMovieAction, getMovies } from '../../store/actions/MovieActions';

const AddMovie = () => {

    const[Title, setTitle] = useState("");
    const[Year, setYear] = useState("");
    const[Rated, setRated] = useState("");
    const[Released, setReleased] = useState("");
    const[Runtime, setRuntime] = useState("");
    const[Genre, setGenre] = useState("");
    const[Director, setDirector] = useState("");
    const[Writer, setWriter] = useState("");
    const[Actors, setActors] = useState("");
    const[Plot, setPlot] = useState("");
    const[Language, setLanguage] = useState("");
    const[Country, setCountry] = useState("");
    const[Awards, setAwards] = useState("");
    const[Poster, setPoster] = useState("");
    const[Production, setProduction] = useState("");
    const[Metascore, setMetascore] = useState("");
    const[imdbRating, setImdbRating] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(addMovieAction({Title, Year, Rated, Released, Runtime, Genre, Director,
        Writer, Actors, Plot, Language, Country, Awards, Poster, Production, Metascore, imdbRating}));
        dispatch(getMovies({page: 1, filter: 'All'}));
        setTitle("");
        setYear("");
        setRated("");
        setReleased("");
        setRuntime("");
        setGenre("");
        setDirector("");
        setWriter("");
        setActors("");
        setPlot("");
        setLanguage("");
        setCountry("");
        setAwards("");
        setPoster("");
        setProduction("");
        setMetascore("");
        setImdbRating("");
    }

    return (
    <ScrollView>
    <View>
        <View style={styles.view}>
            <Text style={styles.item}>Title:</Text>
            <TextInput value={Title} onChangeText={text => setTitle(text)} style={styles.item}></TextInput>
            <Text style={styles.item}>Year:</Text>
            <TextInput value={Year} onChangeText={text => setYear(text)} style={styles.item}></TextInput>
        </View>
        <View style={styles.view}>
            <Text style={styles.item}>Rated:</Text>
            <TextInput value={Rated} onChangeText={text => setRated(text)} style={styles.item} placeholder="e.g. PG-13"></TextInput>
            <Text style={styles.item}>Released:</Text>
            <TextInput value={Released} onChangeText={text => setReleased(text)} style={styles.item} placeholder="e.g. Nov 13 2018"></TextInput>
        </View>
        <View style={styles.view}>
            <Text style={styles.item}>Runtime:</Text>
            <TextInput value={Runtime} onChangeText={text => setRuntime(text)} style={styles.item} placeholder="e.g. 123 min"></TextInput>
            <Text style={styles.item}>Genre:</Text>
            <TextInput value={Genre} onChangeText={text => setGenre(text)} style={styles.item} placeholder="e.g. Drama, Thriller"></TextInput>
        </View>
        <View style={styles.view}>
            <Text style={styles.item}>Director:</Text>
            <TextInput value={Director} onChangeText={text => setDirector(text)} style={styles.item}placeholder="e.g. Roman Polanski"></TextInput>
            <Text style={styles.item}>Writer:</Text>
            <TextInput value={Writer} onChangeText={text => setWriter(text)} style={styles.item} placeholder="e.g. John Doe"></TextInput>
        </View>
        <View style={styles.view}>
            <Text style={styles.item}>Actors:</Text>
            <TextInput value={Actors} onChangeText={text => setActors(text)} style={styles.item} placeholder="e.g. Leonardo DiCaprio, Robert de Niro"></TextInput>
        </View>
        <Text style={styles.item}>Plot:</Text>
        <TextInput value={Plot} onChangeText={text => setPlot(text)} style={styles.item}></TextInput>
        <Text style={styles.item}>Language:</Text>
        <TextInput value={Language} onChangeText={text => setLanguage(text)} style={styles.item} placeholder="e.g. English, French"></TextInput>
        <Text style={styles.item}>Country:</Text>
        <TextInput value={Country} onChangeText={text => setCountry(text)} style={styles.item} placeholder="e.g. USA, UK"></TextInput>
        <Text style={styles.item}>Awards:</Text>
        <TextInput value={Awards} onChangeText={text => setAwards(text)} style={styles.item}></TextInput>
        <Text style={styles.item}>Poster:(URL)</Text>
        <TextInput value={Poster} onChangeText={text => setPoster(text)} style={styles.item}></TextInput>
        <Text style={styles.item}>Production:</Text>
        <TextInput value={Production} onChangeText={text => setProduction(text)} style={styles.item}></TextInput>
        <View style={styles.view}>
            <Text>Metascore:</Text>
            <TextInput value={Metascore} onChangeText={text => setMetascore(text)}></TextInput>
            <Text>IMDB Rating:</Text>
            <TextInput value={imdbRating} onChangeText={text => setImdbRating(text)}></TextInput>
        </View>
        <TouchableOpacity disabled={Title === ""} onPress={handleSubmit}>
            <Text style={styles.item}>Submit</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>);

}

const styles = StyleSheet.create({
    view:{
        flexDirection:"row",
        fontSize: 17
    },
    item: {
        fontSize: 17
    }
})

export default AddMovie;