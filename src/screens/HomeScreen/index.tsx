import React from 'react';

import {Text, View} from 'react-native';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {IRootReduxState} from '@types';
import {useTheme} from '@react-navigation/native';
type Props = {};

const HomeScreen = (props: Props) => {
  const colors = useTheme().colors;
  const ass = useSelector((state: IRootReduxState) => state.userDetails);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[{color: colors.text}]}>HomeScreen</Text>
    </View>
  );
};

export {HomeScreen};
