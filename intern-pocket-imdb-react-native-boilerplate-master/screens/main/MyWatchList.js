import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { getWatchListAction, watchListAction, getMovies } from '../../store/actions/MovieActions';
import makeSelectWatchList from '../../store/selectors/WatchListSelector';
import { TouchableOpacity, ScrollView, TextInput } from 'react-native-gesture-handler';

const MyWatchList = ({navigation}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWatchListAction());
      }, []);

    const list = useSelector(makeSelectWatchList());

    const handleAction = () => {

    }

    const handleRemove = (id) => {
        console.log(id);
        dispatch(watchListAction({movie: id, action: 'remove'}));
        dispatch(getMovies({page: 1, filter: 'All', search:'All'}));
        navigation.navigate("Home");
    }

    return(
        <ScrollView>
        <View>
            <Text>My Watch List:</Text>
            {list.map((movie) => (
                <TouchableOpacity>
                    <View style={{flexDirection: "row"}}>
                        <Text>{movie.Title}</Text>
                        <TouchableOpacity>
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