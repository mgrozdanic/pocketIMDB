import { createStackNavigator } from "react-navigation-stack";

import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
import Verify from "../screens/auth/Verify";

export default createStackNavigator({
  SignIn,
  SignUp,
  Verify
});
