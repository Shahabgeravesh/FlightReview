import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="sign-in">
        <Stack.Screen name="sign-in" component={SignIn} options={{headerShown: false}} />
        <Stack.Screen name="sign-up" component={SignUp} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Auth;