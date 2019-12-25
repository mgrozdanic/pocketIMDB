import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import ModalDropdown from 'react-native-modal-dropdown';
import { getWatchListAction, watchListAction, getMovies, movieWatchUnwatchAction } from '../../store/actions/MovieActions';
import makeSelectWatchList from '../../store/selectors/WatchListSelector';
import { TouchableOpacity, ScrollView, TextInput } from 'react-native-gesture-handler';
import makeSelectUser from '../../store/selectors/UserSelector';
import makeSelectCurrentPage from '../../store/selectors/CurrentPageSelector';
// import { NavigationEvents } from 'react-navigation';

const MyWatchList = ({navigation}) => {

    const dispatch = useDispatch();

    const [filter, setFilter] = useState("All");
    const [title, setTitle] = useState("All");

    const user = useSelector(makeSelectUser());
    const currentPage = useSelector(makeSelectCurrentPage());

    useEffect(() => {
        dispatch(getWatchListAction({title: 'All', filter: 'All'}));
      }, []);

    const list = useSelector(makeSelectWatchList());

    const handleOnPress = (movie) => {
        navigation.navigate("MovieDetails", {movie, currentPage, user, wl: true});
    }

    const handleAction = (movie, action) => {
        dispatch(movieWatchUnwatchAction({movie:movie, currentPage,action:action}));
    }

    const handleRemove = (id) => {
        console.log(id);
        dispatch(watchListAction({movie: id, action: 'remove'}));
    }

    const handleFilter = () => {
        dispatch(getWatchListAction({title, filter}));
    }

    return(
        <ScrollView>
        <View>
            <Text>My Watch List:</Text>
            <ModalDropdown textStyle={{fontSize:14}} options={['All', 'Action', 'Adult', 'Adventure', 'Animation',
                'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film Noir',
                'Game-Show', 'History', 'Horror', 'Musical', 'Music', 'Mystery', 'News', 'Reality-TV', 
                'Romance', 'Sci-Fi', 'Short', 'Sport', 'Talk-Show', 'Thriller', 'War', 'Western']} 
                onSelect={(index, value) => setFilter(value)} />
            <Text>Title:</Text>
            <TextInput placeholder="Title..." value={title} onChangeText={setTitle}/>
            <Button title="Filter" onPress={handleFilter}></Button>
            {list.map((movie) => (
                <TouchableOpacity onPress={() => handleOnPress(movie)}>
                    <View style={{flexDirection: "row"}}>
                        <Text>{movie.Title}</Text>
                        <TouchableOpacity onPress={() => handleAction(movie._id, !movie.watched)}>
                            <Text>{movie.watched ? "  Unwatch" : "  Watch"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRemove(movie._id)}>
                            <Text> Remove</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
        </ScrollView>
    );
}

export default MyWatchList;