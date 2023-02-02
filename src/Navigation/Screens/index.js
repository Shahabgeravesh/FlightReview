import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./Home";
import FlightSearch from "./FlightSearch";
import CategoryScreen from "./CategoryScreen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import CategoryQuestions from "./CategoryQuestions";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Stack = createSharedElementStackNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FlightComment } from "../../Component";

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return(
    <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={Home} options={{headerShown: false}} />
        <Stack.Screen
          name="questions"
          component={CategoryQuestions}
          options={{headerShown: false}}
          sharedElements={(route, otherRoute, showing) => {
            const { data, category } = route.params;
            return [
                {
                    id: data?.ident_iata,
                    animation: 'fade',
                },
                {
                    id: data?.type,
                    animation: 'fade',
                },
                {
                    id: data?.origin?.code_iata,
                    animation: 'fade',
                },
                {
                    id: data?.destination?.code_iata,
                    animation: 'fade',
                },
                {
                    id: data?.scheduled_out,
                    animation: 'fade',
                },
                {
                    id: 'takeOff',
                    animation: 'fade',
                },
                {
                  id: category.id,
                  animation: 'fade',
                }
            ];
          }}
        />
        <Stack.Screen
          name="flight-search"
          component={FlightSearch}
          options={{headerShown: false}}
          sharedElements={(route, otherRoute, showing) => {
            const { data } = route.params;
            return [
                {
                    id: data?.ident_iata,
                    animation: 'fade',
                },
                {
                    id: data?.type,
                    animation: 'fade',
                },
                {
                    id: data?.origin?.code_iata,
                    animation: 'fade',
                },
                {
                    id: data?.destination?.code_iata,
                    animation: 'fade',
                },
                {
                    id: data?.scheduled_out,
                    animation: 'fade',
                },
                {
                    id: 'takeOff',
                    animation: 'fade',
                }
            ];
          }}
        />
        <Stack.Screen 
          name="flightDetails" 
          component={CategoryScreen} 
          options={{headerShown: false}} 
          
        />
        <Stack.Screen name="flightComment" component={FlightComment} options={{headerShown: false}} />
      </Stack.Navigator>
  )
}

const Screens = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="home-screen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return(
              <MaterialCommunityIcons color={color} size={size} name={'home-search-outline'} />
            )
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="home-screen" 
          component={HomeStack}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Screens;