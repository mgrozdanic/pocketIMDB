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
import authService from "../../services/AuthService";

const LeftSlider = ({ navigation }) => {
  logout = () => {
    AsyncStorage.clear();
    navigation.navigate("AuthStack");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostPopularAction());
  }, [reload]);

  const reload = () => console.log("\nRELOAD\n");

  const mostPopular = useSelector(makeSelectMostPopular());
  
  const user = useSelector(makeSelectUser());

  const handleSinglePage = (movie) => {
    navigation.navigate("MovieDetails", {movie});
  }

  const handleMyWatchList = () => {
    navigation.navigate("MyWatchList");
  }

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {user, reload})
  }

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword", {user})
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
              user.image,
          }}
        />
        <View flexDirection={{flexDirection:"column", paddingHorizontal: 10}}>
          <Text> {user.name}</Text>
          <Text> {user.email}</Text>
        </View>
        </View>
        <View style={{flexDirection: "row"}}>
          <Button title="Edit" onPress={ handleEditProfile } />
          <Button title="Change password" onPress={ handleChangePassword }/>
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
