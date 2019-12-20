import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { register, unique } from "../../store/actions/AuthActions";
import { validateEmail, validatePassword, checkEmailUnique } from "./validators";
import { getUniqueUserSelector } from "../../store/selectors/UniqueUserSelector";
import authService from "../../services/AuthService";
import { setTokenAction } from "../../store/actions/MovieActions";
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

const SignUp = () => {
  navigationOptions = {
    title: "Sign in"
  };

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = data => dispatch(register(data));

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
    if (validateEmail(email) && validatePassword(password, confirmPassword) && checkEmailUnique(email)){
      if (name.length < 255){
        handleLogin({ email, password, name });
        registerForPushNotificationsAsync();
        return;
      }
      alert('Name must be shorter than 255 characters.');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      {/* {!isUnique && <span>Nije unique</span>} */}
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      <TextInput
        placeholder="confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      ></TextInput>
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={setName}
      ></TextInput>
      <TouchableOpacity onPress={submitLogin}>
        <Text>Register </Text>
      </TouchableOpacity>
    </View>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.object
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});
