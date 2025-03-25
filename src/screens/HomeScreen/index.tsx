import React from 'react';

import {FlatList, Text, View} from 'react-native';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {IRootReduxState} from '@types';
import {useTheme} from '@react-navigation/native';
import {textStyle} from '@resources';
import {CommonButton} from '@components';
import {localize} from '@languages';
type Props = {};
const data = [
  {id: '1', title: 'Buy Milk'},
  {id: '2', title: 'Buy bread'},
  {id: '3', title: 'Buy eggs'},
];
const HomeScreen = (props: Props) => {
  const colors = useTheme().colors;
  const ass = useSelector((state: IRootReduxState) => state.userDetails);

  const onSubmitSignIn = () => {};
  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.item}>
        <Text style={[textStyle(15, 'Roboto200', 'left'), styles.title]}>
          {item.title}
        </Text>
      </View>
    );
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.line} />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <View style={styles.line} />
      <CommonButton
        buttonStyle={{marginBottom: 20}}
        title={'ADD NEW TODO'}
        onPress={() => {
          onSubmitSignIn();
        }}
        isLoading={false}
      />
    </View>
  );
};

export {HomeScreen};
