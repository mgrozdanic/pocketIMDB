import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { register, unique } from "../../store/actions/AuthActions";
import { validateEmail, validatePassword } from "./validators";
import { getUniqueUserSelector } from "../../store/selectors/UniqueUserSelector";
import authService from "../../services/AuthService";

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

  const checkEmailUnique = async(email) => {
    /*dispatch(unique(email));
    if (useSelector(getUniqueUserSelector()) !== true){
      alert('This email is taken, please choose another one.');
      return false;
    };
    return true;*/
    const unique =  await authService.unique(email);
    if (!unique) alert('This email is taken, please choose another one.');
    return unique;
  }

  const submitLogin = () => {
    if (validateEmail(email) && validatePassword(password, confirmPassword) && checkEmailUnique(email)){
      if (name.length < 255){
        handleLogin({ email, password, name });
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
