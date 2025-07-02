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

const foodData = [
  {id: '1', name: 'Pizza'},
  {id: '2', name: 'Burger'},
  {id: '3', name: 'Pasta'},
];

const CartScreen = () => {
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [deliveryMode, setDeliveryMode] = useState<'Delivery' | 'Pickup'>(
    'Delivery',
  );
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>(
    'card',
  );

  const increment = (id: string) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrement = (id: string) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const renderItem = ({item}: {item: {id: string; name: string}}) => {
    const qty = quantities[item.id] || 0;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => decrement(item.id)}
            style={styles.btn}>
            <Text style={styles.btnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{qty}</Text>
          <TouchableOpacity
            onPress={() => increment(item.id)}
            style={styles.btn}>
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
        data={foodData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
