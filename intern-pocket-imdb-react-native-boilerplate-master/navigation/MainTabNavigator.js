import React from "react";
import { Platform } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";
import LeftSlider from "../screens/main/LeftSlider";
import Home from "../screens/main/Home";
import AddMovie from "../screens/main/AddMovie";
import MoviesItem from "../components/movies/MoviesItem";
import AddMovieOMDb from "../screens/main/AddMovieOMDb";
import RelatedNavigator from "./RelatedNavigator";
import MyWatchList from "../screens/main/MyWatchList";
import EditProfile from "../screens/main/EditProfile";

const HomeStack = createStackNavigator({
  Home,
  MoviesItem, 
  RelatedNavigator,
  AddMovieOMDb,
  AddMovie,
  MyWatchList,
  EditProfile
});

/* eslint-disable react/prop-types, react/display-name */
HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const BottomTabNavigator = createBottomTabNavigator({
  HomeStack,

});

export default createDrawerNavigator(
  {
    BottomTabNavigator: BottomTabNavigator
  },
  {
    contentComponent: LeftSlider
  },
);
