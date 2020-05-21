/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

import HomeScreen from "./screens/home";
import MovieDetailScreen from "./screens/movie/detail"

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    MovieDetail: MovieDetailScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: "none"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppNavigator
    }
  )
);