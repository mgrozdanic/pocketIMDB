import React from "react";
import { Platform } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";
import LeftSlider from "../screens/main/LeftSlider";
import Home from "../screens/main/Home";
import AddMovie from "../screens/main/AddMovie";
import MoviesItem from "../components/movies/MoviesItem";
import AddMovieOMDb from "../screens/main/AddMovieOMDb";
import RelatedNavigator from "./RelatedNavigator";
import MyWatchList from "../screens/main/MyWatchList";
import EditProfile from "../screens/main/EditProfile";
import MyMovies from "../screens/main/MyMovies";

const HomeStack = createStackNavigator({
  Home,
  MoviesItem, 
  RelatedNavigator,
  AddMovieOMDb,
  AddMovie,
  // MyWatchList,
  EditProfile
});

const WatchListStack = createStackNavigator({
  MyWatchList
});

const MyMoviesStack = createStackNavigator({
  MyMovies
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

WatchListStack.navigationOptions = {
  tabBarLabel: "My Watch List",
}

MyMoviesStack.navigationOptions = {
  tabBarLabel: "My Movies"
}

const BottomTabNavigator = createBottomTabNavigator({
  HomeStack,
  WatchListStack,
  MyMoviesStack
});

export default createDrawerNavigator(
  {
    BottomTabNavigator: BottomTabNavigator
  },
  {
    contentComponent: LeftSlider
  },
);
