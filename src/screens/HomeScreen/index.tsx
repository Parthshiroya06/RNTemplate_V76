import React, {useEffect} from 'react';

import {FlatList, Image, View} from 'react-native';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {IRootReduxState} from '@types';
import {useTheme} from '@react-navigation/native';
import {Text, Card, Button, Avatar, FAB} from 'react-native-paper';
import {images} from '@assets';
import firestore from '@react-native-firebase/firestore';
type Props = {};
const tasks = [
  {
    id: '1',
    title: 'Share links in groups/status',
    time: '20 min',
    reward: 'R$5 or 10 GC',
  },
  {id: '2', title: 'Complete a survey', time: '5 min', reward: 'R$2'},
  {
    id: '3',
    title: 'Record a 30s video about the app',
    time: '10 min',
    reward: 'R$5 or 10 GC',
  },
  {id: '4', title: 'Refer friends', time: '—', reward: 'R$3 per friend'},
  {id: '5', title: 'Help a local business', time: '1h', reward: 'R$10 + bonus'},
];
const HomeScreen = (props: Props) => {
  const colors = useTheme().colors;
  const ass = useSelector((state: IRootReduxState) => state.userDetails);
  const balance = 18; // mock balance

  const renderItem = ({item}) => (
    <Card style={styles.taskCard}>
      <View style={styles.titleRow}>
        <Image source={images.coins_image} style={styles.coinImageSty} />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskSubtitle}>
            Reward: {item.reward} GiroCoins
          </Text>
          <Text style={styles.taskSubtitle}>Est. Time: {item.time}</Text>
        </View>
      </View>
      <Card.Actions>
        <Button mode="contained" onPress={() => console.log('Task started')}>
          Do Task
        </Button>
      </Card.Actions>
    </Card>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>GiroCoin Balance</Text>
      <Text style={styles.balanceValue}>{balance} 💰</Text>

      <Text style={styles.sectionTitle}>Available Tasks</Text>
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
        label="Add Task"
        onPress={() => console.log('Add Task')}
      />
    </View>
  );
};

export {HomeScreen};
