import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { changeUserProfile } from '../../store/actions/AuthActions';
import { validateEmail, checkEmailUnique } from '../auth/validators';

const EditProfile = ({navigation}) => {

    const [name, setName] = useState(navigation.getParam('user').name);
    const [email, setEmail] = useState(navigation.getParam('user').email);
    const [imageUri, setImageUri] = useState(navigation.getParam('user').image);
    const [imageData, setImageData] = useState("");
    const [extension, setExstension] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        getPermissionAsync();
      }, []);

    const handleProfileChange = () => {
        if (validateEmail(email) && (
            navigation.getParam('user').email !== email ? checkEmailUnique(email) : true)){
            if (name.length < 255){
                let reload = navigation.getParam('reload');
                dispatch(changeUserProfile({name, email, photo:{uri: "data:image/jpeg;base64," + imageData, ext: extension}, reload}));
                navigation.navigate("Home");
                return;
            }
            alert('Name must be shorter than 255 characters.');
          }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
          exif: true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImageUri(result.uri);
          setImageData(result.base64);
          setExstension(result.exif);
        }
    }

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    }

    return (
        <View style={{alignSelf:"center"}}>
            <TouchableOpacity onPress={pickImage}>
                <Avatar
                    size = 'xlarge'
                    rounded
                    source={{
                        uri:
                        imageUri,
                }}/>
            </TouchableOpacity>
            <TextInput style={{alignSelf:"center"}} value={ name } onChangeText={ ( text ) => setName(text) } />
            <TextInput style={{alignSelf:"center"}} value={ email } onChangeText={ ( text ) => setEmail(text) }/>
            <Button title="Submit" onPress={ handleProfileChange } />
        </View>
        );
}

export default EditProfile;