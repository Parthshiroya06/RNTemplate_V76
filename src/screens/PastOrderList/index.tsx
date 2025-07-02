import {FlatList, Pressable, Text, View} from 'react-native';
import React from 'react';
import {styles} from './style';

type Props = {};

const PastOrderList = (props: Props) => {
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
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.date}>Order Date: {item.date}</Text>
      <Text style={styles.items}>Items: {item.items.join(', ')}</Text>
      <Text style={styles.total}>Total: ${item.total}</Text>
      <Pressable style={styles.reorderBtn}>
        <Text style={styles.reorderText}>Reorder</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pastOrders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export {PastOrderList};
