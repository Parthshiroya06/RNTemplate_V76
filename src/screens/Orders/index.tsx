import React, {useState} from 'react';
import {ScrollView, Text, View, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './style';

type Props = {};

const pastOrders = [
  {
    id: '1',
    date: '2024-06-25',
    items: ['Pizza', 'Coke'],
    total: 320,
  },
  {
    id: '2',
    date: '2024-06-18',
    items: ['Burger', 'Fries', 'Pepsi'],
    total: 250,
  },
  {
    id: '3',
    date: '2024-06-10',
    items: ['Pasta'],
    total: 180,
  },
];

const Orders = (props: Props) => {
  const [data, setData] = useState(pastOrders);

  const renderItem = ({item, index}) => (
    <View key={index} style={styles.card}>
      <Text style={styles.date}>Order Date: {item.date}</Text>
      <Text style={styles.items}>Items: {item.items?.join(', ')}</Text>
      <Text style={styles.total}>Total: ${item.total}</Text>
      <Pressable style={styles.reorderBtn}>
        <Text style={styles.reorderText}>Reorder</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.listContent}>
        {data.map((item, index) => renderItem({item, index}))}
      </ScrollView>
    </SafeAreaView>
  );
};

export {Orders};
