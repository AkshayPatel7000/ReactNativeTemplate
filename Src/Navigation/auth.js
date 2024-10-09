import * as React from 'react';
import {LoginScreen, OnboardingScreen, RegisterScreen} from '../Screens';
import {RoutesName} from '../Utils/Resource';

const AuthStack = Stack => {
  return (
    <Stack.Navigator
      screenOptions={{animation: 'none', headerShown: false}}
      initialRouteName={RoutesName.ONBOARDING}>
      <Stack.Screen name={RoutesName.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={RoutesName.LOGIN} component={LoginScreen} />
      <Stack.Screen name={RoutesName.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
