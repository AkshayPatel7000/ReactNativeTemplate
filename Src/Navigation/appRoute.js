import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import routesName from '../Utils/Resource/routesName';
import BottomTabs from './BottomTabs/BottomTabs';

const Stack = createNativeStackNavigator();
const AppRoute = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'none', headerShown: false}}>
      <Stack.Screen name={routesName.BOTTOM_TABS} component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default AppRoute;
