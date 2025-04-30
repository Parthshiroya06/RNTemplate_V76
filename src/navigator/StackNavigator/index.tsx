import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackNavigator} from './RootStackNavigator';

import {IRootReduxState, RootStackParamList} from '@types';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {CombinedDarkTheme, CombinedLightTheme} from '@resources';
import {AppStackNavigator} from './AppStackNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const {language_code} = useSelector(
    (state: IRootReduxState) => state.userDetails,
  );
  const [set, setState] = useState('');
  useEffect(() => {
    setState('');
  }, [language_code]);
  const theme = useColorScheme();
  const {themeMode} = useSelector(
    (state: IRootReduxState) => state.userDetails,
  );

  let isThemeMode = themeMode;

  if (themeMode == 'Auto') {
    let isAutoTheme = theme == 'dark' ? 'Dark' : 'Light';
    isThemeMode = isAutoTheme;
  } else {
    isThemeMode = themeMode;
  }

  return (
    <NavigationContainer
      theme={isThemeMode === 'Dark' ? CombinedLightTheme : CombinedLightTheme}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        {RootStackNavigator()}
        {AppStackNavigator()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {StackNavigator};
