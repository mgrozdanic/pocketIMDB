import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { changeUserProfile } from '../../store/actions/AuthActions';
import { validateEmail, checkEmailUnique } from '../auth/validators';

const EditProfile = ({navigation}) => {

    const [name, setName] = useState(navigation.getParam('user').name);
    const [email, setEmail] = useState(navigation.getParam('user').email);

    const dispatch = useDispatch();

    const handleProfileChange = () => {
        if (validateEmail(email) && (
            navigation.getParam('user').email !== email ? checkEmailUnique(email) : true)){
            if (name.length < 255){
              dispatch(changeUserProfile({name, email, photo:{}}));
              navigation.navigate("Home");
              return;
            }
            alert('Name must be shorter than 255 characters.');
          }
    }

    return (
        <View style={{alignSelf:"center"}}>
            <Avatar
                size = 'xlarge'
                rounded
                source={{
                    uri:
                    'https://facebook.github.io/react/logo-og.png',
            }}/>
            <TextInput value={ name } onChangeText={ ( text ) => setName(text) } />
            <TextInput value={ email } onChangeText={ ( text ) => setEmail(text) }/>
            <Button title="Submit" onPress={ handleProfileChange } />
        </View>
        );
}

export default EditProfile;