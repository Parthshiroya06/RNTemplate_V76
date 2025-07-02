import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CartScreen, WebViewScreen} from '@screen';
import {RootStackParamList} from '@types';

const AppStack = createNativeStackNavigator<RootStackParamList>();

const AppStackNavigator = () => {
  return (
    <AppStack.Group>
      <AppStack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={({route}) => {
          return {
            headerTitle: route.params?.title ?? 'default Title',
            headerShown: true,
          };
        }}
      />
      {/* <AppStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={({route}) => {
          return {
            headerTitle: 'Cart',
            headerShown: true,
          };
        }}
      /> */}
    </AppStack.Group>
  );
};

export {AppStackNavigator};
