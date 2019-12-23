import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import {validateEmail} from './validators';
import { logIn } from "../../store/actions/AuthActions";
import { setTokenAction } from "../../store/actions/MovieActions";
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

const SignIn = ({ navigation }) => {
  navigationOptions = {
    title: "Sign in"
  };

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = data => dispatch(logIn(data));

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    
    dispatch(setTokenAction({token}));
    
    //this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  const submitLogin = () => {
    if (validateEmail(email)){
      handleLogin({ email, password });
      registerForPushNotificationsAsync();
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      <TouchableOpacity onPress={submitLogin}>
        <Text>Log In </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToRegister}>
        <Text>Register </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => dispatch(getMovies())}>
        <Text>Movies</Text>
      </TouchableOpacity> */}

    </View>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.object
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});
