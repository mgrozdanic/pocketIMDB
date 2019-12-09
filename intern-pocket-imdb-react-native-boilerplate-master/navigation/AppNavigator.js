import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthLoading from "../screens/AuthLoading";
import MainTabNavigator from "./MainTabNavigator";
import AuthNavigator from "./AuthNavigator";
import MovieNavigator from "./MovieNavigator";

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading,
    AuthStack: AuthNavigator,
    MainStack: MainTabNavigator,//didao ovo ispod
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(AppNavigator);
