import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, TextInput, Button } from 'react-native';
import { validatePassword } from "./validators";
import authService from "../../services/AuthService";
import { changePasswordAction } from "../../store/actions/AuthActions";

const ChangePassword = ({ navigation }) => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const dispatch = useDispatch();

    const checkOldPassword = async() => {
        if (await authService.passwordMatching(navigation.getParam('user')._id, oldPassword)) {
            return true;
        } else {
            alert("Old password is incorrect.");
            return false;
        }
    }

    const handleChangePassword = async() => {
        console.log(navigation.getParam('user').password)
        if (await checkOldPassword() && validatePassword(newPassword, confirmedPassword)) {
            dispatch(changePasswordAction({userId: navigation.getParam('user')._id, password: newPassword}));
            navigation.navigate("Home");
        }
    }

    return (
        <View style={{alignSelf:"center"}}>
            <TextInput placeholder="Old password..." value={oldPassword} 
                onChangeText={text => setOldPassword(text)} style={{alignSelf:"center"}} />
            <TextInput placeholder="New password..." value={newPassword}
                onChangeText={text => setNewPassword(text)} style={{alignSelf:"center"}} />
            <TextInput placeholder="Confirm new password" value={confirmedPassword}
                onChangeText={text => setConfirmedPassword(text)} style={{alignSelf:"center"}} />
            <Button title="Submit" onPress={handleChangePassword} style={{alignSelf:"center"}} />
        </View>
    );
}

export default ChangePassword;