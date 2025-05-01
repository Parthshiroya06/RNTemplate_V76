import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonButton, CommonModal, InputBox} from '@components';
import {useStateWithCallback} from '@hooks';
import {useNavigation, useTheme} from '@react-navigation/native';
import {checkLength, isNumber} from '@utils';
import {textStyle} from '@resources';
import DropDownPicker from 'react-native-dropdown-picker';
import {Firestore} from '@services';
import {IRootReduxState} from '@types';
import {useSelector} from 'react-redux';
import {localize} from '@languages';
import {TextInput as PaperTextInput} from 'react-native-paper';
type Props = {};
const common_obj = {
  value: '',
  isError: false,
};
let main_obj = {
  product_name: common_obj,
  estimated_value: {value: 0, isError: false},
  remarks: '',
  selected_service: 'Other',
};
const serviceCategories = [
  {
    title: 'Transportation / Delivery',
    data: [
      'Uber',
      '99 Taxi',
      'BlaBlaCar',
      'InDriver',
      'Cabify',
      'Local Moto Taxi',
      'School Transportation',
      'Executive Transportation',
      'Express Delivery',
      'App Delivery Driver',
      'Courier Service',
      'Package Delivery',
      'Bike Rental',
      'Scooter Rental',
      'Pet Transport',
    ],
  },
  {
    title: 'Food and Beverage',
    data: [
      'iFood',
      'Rappi',
      'Uber Eats',
      'Glovo',
      'James Delivery',
      'Apptite',
      'Zé Delivery (Beverages)',
      'Bee Delivery',
      'Cornershop',
      'Grocery Shopping Services',
    ],
  },
  {
    title: 'Entertainment and Streaming',
    data: [
      'Netflix',
      'Amazon Prime Video',
      'Disney+',
      'HBO Max',
      'Spotify',
      'Deezer',
      'YouTube Premium',
      'Apple Music',
      'Crunchyroll',
      'Paramount+',
    ],
  },
  // 👉 add other categories too...
];

// 🔥 flatten

const AddProduct = (props: Props) => {
  const colors = useTheme().colors;
  const navigation = useNavigation();
  const {profileDetails, select_currency} = useSelector(
    (state: IRootReduxState) => state.userDetails,
  );
  const serviceList = serviceCategories.flatMap(category =>
    category.data.map(service => ({
      label: service,
      value: service,
    })),
  );
  const [input, setInputs] = useStateWithCallback(main_obj);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(serviceList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSelectService = (service: string) => {
    setInputs({
      ...input,
      selected_service: service,
    });
    closeModal();
  };
  const checkValidatoin = (item: number) => {
    return new Promise((resolve, reject) => {
      let state_object = {...input};

      switch (item) {
        case 1:
          if (
            !isNumber(input.estimated_value.value) ||
            Number(input.estimated_value.value) <= 0
          ) {
            state_object.estimated_value = {
              ...state_object.estimated_value,
              isError: localize('enter_amount'),
            };

            inputRef1.current?.focus();
          }

        case 0:
          if (input.product_name?.value.length < 3) {
            state_object.product_name = {
              ...state_object.product_name,
              isError: localize('enter_must_be_character'),
            };

            inputRef.current?.focus();
          }

        default:
          setInputs(state_object, () => resolve(state_object));
          break;
      }
    });
  };
  const onSubmit = async () => {
    try {
      const {product_name, estimated_value} = await checkValidatoin(1);

      if (!product_name.isError && !estimated_value.isError) {
        let service_obj = {
          product_name: input.product_name.value,
          estimated_value: input.estimated_value.value,
          discription: input.remarks,
          selected_service: input.selected_service,
          select_currency: select_currency,
          uid: profileDetails.uid,
        };
        setIsLoading(true);
        await Firestore.collections('Products').then(docs =>
          docs.doc().set(service_obj),
        );
        setIsLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      setIsLoading(false);
      console.log('store data error>>>>', error);
    }
  };
  const _renderLabelText = (label: string = '') => {
    return (
      <View style={styles.labelView}>
        <Text style={[textStyle(12, 'Roboto', 'left'), {color: colors.red}]}>
          {label}
        </Text>
      </View>
    );
  };

  const _renderCommonModel = () => {
    return (
      <CommonModal onClose={() => {}} isVisible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView>
              {serviceCategories.map((category, index) => (
                <View key={index}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  {category.data.map((service, idx) => (
                    <Pressable
                      key={idx}
                      style={styles.serviceItem}
                      onPress={() => handleSelectService(service)}>
                      <Text>{service}</Text>
                    </Pressable>
                  ))}
                </View>
              ))}
            </ScrollView>

            <Pressable style={styles.cancelButton} onPress={closeModal}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </CommonModal>
    );
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <InputBox
          refs={inputRef}
          label={localize('product_name')}
          blurOnSubmit={true}
          value={input.product_name?.value}
          onChangeText={text => {
            setInputs({
              ...input,
              product_name: {value: text, isError: false},
            });
          }}
          textinputStyle={styles.contactNameTextInput}
          outlineStyle={{
            borderColor: input.product_name?.isError ? colors.red : colors.blue,
          }}
          onSubmitEditing={() => {
            console.log('on Submit Done');
          }}
          theme={{
            colors: {
              text: 'black',
              onSurfaceVariant: colors.grey,
              primary: input.product_name?.isError ? colors.red : colors.blue,
            },
          }}
        />
        {_renderLabelText(input.product_name?.isError)}

        <InputBox
          right={
            <PaperTextInput.Icon
              disabled={true}
              style={{width: 100, paddingEnd: 20}}
              icon={() => (
                <Text
                  style={[
                    textStyle(14, 'Roboto400'),
                    {fontWeight: '600'},
                  ]}>{`${select_currency.code}(${select_currency.symbol})`}</Text>
              )}
            />
          }
          refs={inputRef1}
          label={localize('estimated_time')}
          blurOnSubmit={true}
          keyboardType="numeric"
          value={input.estimated_value?.value}
          onChangeText={text => {
            const numericOnly = text.replace(/[^0-9]/g, '');
            setInputs({
              ...input,
              estimated_value: {value: numericOnly, isError: false},
            });
          }}
          textinputStyle={styles.contactNameTextInput}
          outlineStyle={{
            borderColor: input.estimated_value?.isError
              ? colors.red
              : colors.blue,
          }}
          onSubmitEditing={() => {
            console.log('on Submit Done');
          }}
          theme={{
            colors: {
              text: 'black',
              onSurfaceVariant: colors.grey,
              primary: input.estimated_value?.isError
                ? colors.red
                : colors.blue,
            },
          }}
        />
        {_renderLabelText(input.estimated_value?.isError)}
        <InputBox
          refs={inputRef2}
          label={localize('enter_discription')}
          blurOnSubmit={true}
          value={input.remarks}
          onChangeText={text => {
            setInputs({
              ...input,
              remarks: text,
            });
          }}
          textinputStyle={styles.textInputStyle}
          outlineStyle={{
            borderColor: colors.blue,
          }}
          onSubmitEditing={() => {
            console.log('on Submit Done');
          }}
          theme={{
            colors: {
              text: 'black',
              onSurfaceVariant: colors.grey,
              primary: colors.blue,
            },
          }}
        />
        <Pressable
          onPress={openModal}
          style={[styles.selectBox, {borderColor: colors.blue}]}>
          <Text style={styles.selectBoxText}>{input.selected_service}</Text>
        </Pressable>

        <CommonButton
          title={localize('save')}
          onPress={() => {
            onSubmit();
          }}
          isLoading={isLoading}
        />
      </View>
      {_renderCommonModel()}
    </KeyboardAwareScrollView>
  );
};

export {AddProduct};
