import React, {useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {CommonButton} from '@components'; // replace or define this if needed
import {styles} from './style';
import {useRoute} from '@react-navigation/native';
import {textStyle} from '@resources';

const foodData = [
  {id: '1', name: 'Pizza'},
  {id: '2', name: 'Burger'},
  {id: '3', name: 'Pasta'},
];

const CartScreen = () => {
  const route = useRoute();

  const [quantities, setQuantities] = useState<any>(route.params.param?.count);
  const [deliveryMode, setDeliveryMode] = useState<'Delivery' | 'Pickup'>(
    'Delivery',
  );
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [itemPrice, setItemPrice] = useState(
    route.params?.param?.price?.replace('$', '') ?? 0,
  );
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>(
    'card',
  );

  const [foodlist, setFoodList] = useState([route.params?.param]);

  const increment = () => {
    let plus_Count = quantities + 1;
    setQuantities(plus_Count);
    let itemValues =
      Number(plus_Count) * Number(route.params?.param?.price.replace('$', ''));
    setItemPrice(itemValues);
    // setQuantities(prev => ({
    //   ...prev,
    //   [id]: (prev[id] || 0) + 1,
    // }));
  };

  const decrement = () => {
    if (quantities > 1) {
      let minus_Count = quantities - 1;
      setQuantities(minus_Count);
      let itemValues =
        Number(minus_Count) *
        Number(route.params?.param?.price.replace('$', ''));
      console.log(
        'Sdfsdfsdf>>>>>',
        Number(minus_Count),
        itemValues,
        minus_Count,
      );
      setItemPrice(itemValues);

      // setQuantities(prev => ({
      //   ...prev,
      //   [id] Math.max((prev[id] || 0) - 1, 0),
      // }));
    }
  };

  const renderItem = ({
    item,
  }: {
    item: {count: string; price: string; title: string};
  }) => {
    const qty = quantities || 0;

    return (
      <View style={styles.itemContainer}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.name}>{item.title}</Text>
          <Text
            style={[
              textStyle(15, 'Roboto200', 'left'),
            ]}>{`$${itemPrice}`}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => decrement()} style={styles.btn}>
            <Text style={styles.btnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{qty}</Text>
          <TouchableOpacity onPress={() => increment()} style={styles.btn}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleCheckout = () => {
    console.log('Quantities:', quantities);
    console.log('Delivery mode:', deliveryMode);
    console.log('Special instructions:', specialInstructions);
    console.log('Payment method:', paymentMethod);
    // Navigate or confirm checkout
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <FlatList
        data={foodlist}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.count}+${index}`}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={
          <>
            {/* Delivery / Pickup Toggle */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                onPress={() => setDeliveryMode('Delivery')}
                style={[
                  styles.toggleButton,
                  deliveryMode === 'Delivery' && styles.activeToggle,
                ]}>
                <Text
                  style={[
                    styles.toggleText,
                    deliveryMode === 'Delivery' && styles.activeText,
                  ]}>
                  Delivery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDeliveryMode('Pickup')}
                style={[
                  styles.toggleButton,
                  deliveryMode === 'Pickup' && styles.activeToggle,
                ]}>
                <Text
                  style={[
                    styles.toggleText,
                    deliveryMode === 'Pickup' && styles.activeText,
                  ]}>
                  Pickup
                </Text>
              </TouchableOpacity>
            </View>

            {/* Special Instructions */}
            <TextInput
              placeholder="Special instructions (e.g. 'no peanuts')"
              value={specialInstructions}
              placeholderTextColor={'grey'}
              onChangeText={setSpecialInstructions}
              multiline
              numberOfLines={3}
              style={styles.textBox}
            />

            {/* Payment Method Selection */}
            <View style={styles.section}>
              <Text style={styles.label}>Choose Payment Method:</Text>

              {[
                {key: 'card', label: 'Credit/Debit Card'},
                {key: 'upi', label: 'UPI'},
                {key: 'cod', label: 'Cash on Delivery'},
              ].map(method => (
                <TouchableOpacity
                  key={method.key}
                  onPress={() => setPaymentMethod(method.key as any)}
                  style={styles.optionContainer}>
                  <View
                    style={[
                      styles.radioOuter,
                      paymentMethod === method.key && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.optionText}>{method.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <CommonButton onPress={handleCheckout} title="Check Out" />
          </>
        }
      />
    </SafeAreaView>
  );
};

export {CartScreen};
