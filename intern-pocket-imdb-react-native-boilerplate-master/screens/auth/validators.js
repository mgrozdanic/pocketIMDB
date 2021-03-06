import {useDispatch} from 'react-redux';
import authService from "../../services/AuthService";

export const validateEmail = (inputText) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat) && inputText.length < 255) {
      return true;
    } else {
      alert("You have entered an invalid email address!");
      return false;
    }
  }

export const validatePassword = (password, confirmedPassword) => {
    if (password === confirmedPassword){
        if(password.length >= 6){
            return true;
        }
        alert('Password must be at least 6 characters long.');
        return false;
    } 
    alert('Password and confirmed password do not match.');
    return false;
}

export const checkEmailUnique = async(email) => {
  const unique =  await authService.unique(email);
  if (!unique) alert('This email is taken, please choose another one.');
  return unique;
}