import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Screen from '@screen';
import {BottomTabBarParamList, ImageKeys, ScreenComponents} from '@types';
import {
  Dimensions,
  Easing,
  Image,
  Platform,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {images} from '@assets';
import {
  Colors,
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '@resources';
import {isIpad} from '@utils';
import {useTheme} from '@react-navigation/native';
import {localize} from '@languages';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const BottomTab = createBottomTabNavigator<BottomTabBarParamList>();

// const AddScreen = ({
//   name,
//   label,
//   icon,
//   component,
// }: {
//   name: string;
//   label: string;
//   icon: ImageKeys;
//   component: React.ComponentType<any>;
// }) => {
//   const colors = useTheme().colors;
//   return (
//     <BottomTab.Screen
//       name={name}
//       component={component}
//       options={{
//         tabBarLabel: label,

//         tabBarIcon: ({color}) => {
//           return (
//             <Image
//               source={images[icon]}
//               style={{
//                 tintColor: color,
//                 width: responsiveWidth(5),
//                 height: responsiveHeight(5),
//                 resizeMode: 'contain',
//               }}
//             />
//           );
//         },
//       }}
//     />
//   );
// };
const BottomTabNavigator = () => {
  const colors = useTheme().colors;
  const screens: ScreenComponents = {
    HomeScreen: Screen.HomeScreen,
    SettingScreen: Screen.SettingScreen,
  };
  const isDarkMode = useColorScheme();

  const _addScreen = (
    name: keyof ScreenComponents,
    label: string,
    icon: ImageKeys,
  ) => {
    return (
      <BottomTab.Screen
        name={name}
        component={screens[name]}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={images[icon]}
                style={[
                  {
                    tintColor: focused ? '#f56f07' : colors.icons,
                  },
                  styles.imageStyle,
                ]}
              />
            );
          },
        }}
      />
    );
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f56f07',
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderTopWidth: 0,
          elevation: 0,
          // paddingBottom: Platform.OS === 'android' ? 0 : 0,
          height: responsiveHeight(isIpad() ? 5 : 6.5),
        },
      }}>
      {_addScreen('HomeScreen', 'Home', 'ic_home')}
      {_addScreen('SettingScreen', 'Setting', 'ic_setting')}
    </BottomTab.Navigator>
  );
};

export {BottomTabNavigator};

const styles = StyleSheet.create({
  imageStyle: {
    width: responsiveWidth(6),
    height: responsiveHeight(6),
    resizeMode: 'contain',
    paddingBottom: 30,
    margin: 30,
  },
});
