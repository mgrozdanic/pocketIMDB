import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import {
  StyleSheet,
  Button,
  View,
  Text,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import PropTypes from "prop-types";
import { Avatar } from "react-native-elements";
import { getMostPopularAction } from "../../store/actions/MovieActions";
import makeSelectMostPopular from "../../store/selectors/MostPopularSelector";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import makeSelectUser from "../../store/selectors/UserSelector";

const LeftSlider = ({ navigation }) => {
  logout = () => {
    AsyncStorage.clear();
    navigation.navigate("AuthStack");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostPopularAction());
  }, []);

  const mostPopular = useSelector(makeSelectMostPopular());
  const user = useSelector(makeSelectUser());

  const handleSinglePage = (movie) => {
    navigation.navigate("MovieDetails", {movie});
  }

  const handleMyWatchList = () => {
    navigation.navigate("MyWatchList");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{flexDirection:"row", paddingHorizontal: 10}}>
        <Avatar
          size = 'medium'
          rounded
          source={{
            uri:
              'https://facebook.github.io/react/logo-og.png',
          }}
        />
        <View flexDirection={{flexDirection:"column", paddingHorizontal: 10}}>
          <Text> {user.name}</Text>
          <Text> {user.email}</Text>
        </View>
        </View>
        <View style={{flexDirection: "row"}}>
          <Button title="Edit"/>
          <Button title="Change password"/>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        {/* <Button onPress={navigation.closeDrawer} title="Close me" /> */}
        <View style={{flexDirection:"row"}}>
          <Button onPress={handleMyWatchList} title="My Watch List" style={{alignSelf:"left"}} />
        </View>
        <Text style={{paddingHorizontal: 10, fontSize: 17}}>Most popular:</Text>
        <ScrollView>
        {mostPopular.map((movie) => (
        <TouchableOpacity style={{paddingHorizontal: 10, alignSelf:"left"}} onPress={() => handleSinglePage(movie)}>
          <Text>{movie.Title}</Text>
        </TouchableOpacity>))}
        </ScrollView>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        <View style={{flexDirection:"row"}}> 
          <Button onPress={logout} title="Logout" style={{alignSelf:"left"}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

LeftSlider.propTypes = {
  navigation: PropTypes.object
};

export default LeftSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
