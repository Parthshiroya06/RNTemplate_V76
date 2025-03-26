import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, LoginScreen, SplashScreen, ToDoScreen} from '@screen';
import {RootStackParamList} from '@types';
import {BottomTabNavigator} from 'navigator/BottomTabNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Group screenOptions={{headerShown: true}}>
      <RootStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Home', headerTitleAlign: 'center'}}
      />
      <RootStack.Screen
        name="ToDoScreen"
        component={ToDoScreen}
        options={{title: 'Add New ToDo', headerTitleAlign: 'center'}}
      />
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />

      <RootStack.Screen name="LoginScreen" component={LoginScreen} />

      <RootStack.Screen name="BottomTabBar" component={BottomTabNavigator} />
    </RootStack.Group>
  );
};

export {RootStackNavigator};
