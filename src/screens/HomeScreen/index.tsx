import React, {useEffect, useState} from 'react';

import {FlatList, Image, View} from 'react-native';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {IRootReduxState, RootStackParamList} from '@types';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Text, Card, Button, Avatar, FAB} from 'react-native-paper';
import {images} from '@assets';
import firestore from '@react-native-firebase/firestore';
import {localize} from '@languages';
type Props = {};

const HomeScreen = (props: Props) => {
  const tasks = [
    {
      id: '1',
      title: localize('share_link_text'),
      time: `20 ${localize('min')}`,
      reward: `R$5 or 10 ${localize('min')}`,
    },
    {
      id: '2',
      title: localize('complete_survey'),
      time: `5 ${localize('min')}`,
      reward: 'R$2',
    },
    {
      id: '3',
      title: localize('record_video_text'),
      time: `10 ${localize('min')}`,
      reward: `R$5 or 10 ${localize('GC')}`,
    },
    {
      id: '4',
      title: localize('refer_friends'),
      time: '—',
      reward: `R$3 ${localize('per_friend')}`,
    },
    {
      id: '5',
      title: localize('help_local_business'),
      time: `1${localize('h')}`,
      reward: `R$10 + ${localize('help_local_business')}`,
    },
  ];
  const navigation = useNavigation();
  const colors = useTheme().colors;
  const {profileDetails} = useSelector(
    (state: IRootReduxState) => state.userDetails,
  );

  const [coin, setCoin] = useState(profileDetails.giro_coin);
  const balance = 18; // mock balance

  const goToAddProduct = () => {
    navigation.navigate('AddProduct');
  };
  const renderItem = ({item}) => (
    <Card style={styles.taskCard}>
      <View style={styles.titleRow}>
        <Image source={images.coins_image} style={styles.coinImageSty} />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskSubtitle}>
            {`${localize('reward')} ${item.reward} ${localize('giro_coin')}`}
          </Text>
          <Text style={styles.taskSubtitle}>{`${localize('est_time')} ${
            item.time
          }`}</Text>
        </View>
      </View>
      <Card.Actions>
        <Button mode="contained" onPress={() => console.log('Task started')}>
          {localize('do_task')}
        </Button>
      </Card.Actions>
    </Card>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>{localize('giroCoin_balance')}</Text>
      <Text style={styles.balanceValue}>{coin} 💰</Text>

      <Text style={styles.sectionTitle}>{localize('available_task')}</Text>
      <FlatList
        style={{flex: 1}}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{marginBottom: 100}}
      />

      <FAB
        style={styles.fab}
        icon={({color, size}) => (
          <Image source={images.plus} style={styles.plusImage} />
        )}
        label={localize('add_task')}
        onPress={() => {
          goToAddProduct();
        }}
      />
    </View>
  );
};

export {HomeScreen};
