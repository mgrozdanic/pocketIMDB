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
import { getMostPopularAction } from "../../store/actions/MovieActions";
import makeSelectMostPopular from "../../store/selectors/MostPopularSelector";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

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

  const handleSinglePage = (movie) => {
    navigation.navigate("MovieDetails", {movie});
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button onPress={navigation.closeDrawer} title="Close me" />

        <Button onPress={logout} title="Logout" />
        <Text style={{paddingHorizontal: 10, alignSelf:"center", fontSize: 17}}>Most popular:</Text>
        <ScrollView>
        {mostPopular.map((movie) => (
        <TouchableOpacity style={{paddingHorizontal: 10, alignSelf:"center"}} onPress={() => handleSinglePage(movie)}>
          <Text>{movie.Title}</Text>
        </TouchableOpacity>))}
        </ScrollView>
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
