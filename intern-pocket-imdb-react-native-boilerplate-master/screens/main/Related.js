import React from 'react';
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import makeSelectRelated from '../../store/selectors/RelatedSelector';
import makeSelectUser from '../../store/selectors/UserSelector';
import makeSelectCurrentPage from '../../store/selectors/CurrentPageSelector';

const Related = ({ navigation }) => {

    let movies = useSelector(makeSelectRelated());
    const user = useSelector(makeSelectUser());
    const currentPage = useSelector(makeSelectCurrentPage());

    const handleSinglePage = (movie) => {
        navigation.navigate("MovieDetails", {movie, user, currentPage, wl: false});
    }

    return (
    <View>
        <Text style={{paddingHorizontal: 10, alignSelf:"center", fontSize: 17}}>Related:</Text>
        {movies.map((movie) => (
                <TouchableOpacity onPress={() => handleSinglePage(movie)} 
                style={{paddingHorizontal: 10, alignSelf:"center"}}>
                    <Text>{movie.Title}</Text>
                </TouchableOpacity>
            )
        )}
    </View>);
};

Related.propTypes = {
    navigation: PropTypes.object
  };

export default Related;