import React from 'react';
import MovieDetails from '../components/movies/MovieDetails';
import Related from '../screens/main/Related';
import { createDrawerNavigator } from 'react-navigation-drawer';

const RelatedNavigator = createDrawerNavigator(
    {
      MovieDetails: MovieDetails
    },
    {
      contentComponent: Related,
    }
  );
  
  export default RelatedNavigator;