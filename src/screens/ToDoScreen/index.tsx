import React, {useRef} from 'react';

import {
  FlatList,
  KeyboardTypeOptions,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {ImageKeys, IRootReduxState} from '@types';
import {useTheme} from '@react-navigation/native';
import {Colors, responsiveHeight, textStyle} from '@resources';
import {CommonButton, InputBox} from '@components';
import {localize} from '@languages';
import {images} from '@assets';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {useStateWithCallback} from '@hooks';
type Props = {};

const ToDoScreen = (props: Props) => {
  const colors = useTheme().colors;

  const common_obj = {
    value: '',
    isError: '',
  };
  let main_obj = {
    title: common_obj,
    desc: common_obj,

    // forgot_password: common_obj,
  };
  const [input, setInputs] = useStateWithCallback(main_obj);
  const ass = useSelector((state: IRootReduxState) => state.userDetails);
  const inputRef = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
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
  const _renderTextInput = (
    label: string,
    state: string,
    icons: ImageKeys,
    ref: any,
    keyboardType: KeyboardTypeOptions = 'default',
    isShow: boolean = false,
    // isConfirmPassword: boolean = false,
  ) => {
    return (
      <>
        <InputBox
          refs={ref}
          label={label}
          blurOnSubmit={true}
          keyboardType={keyboardType}
          value={''}
          onChangeText={text => {}}
          textinputStyle={styles.contactNameTextInput}
          outlineStyle={{
            borderColor: input[state].isError
              ? Colors.red
              : Colors.DarkSlateBlue,
          }}
          onSubmitEditing={() => {
            console.log('on Submit Done');
          }}
          textColor={colors.text}
          theme={{
            colors: {
              onSurfaceVariant: colors.black,
              primary: input[state].isError ? Colors.red : colors.black,
            },
          }}
        />
      </>
    );
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[textStyle(20, 'Roboto400', 'center'), styles.title]}>
        {'Add New Todo'}
      </Text>
      <View style={styles.line} />
      <View style={{alignItems: 'center'}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={[textStyle(18, 'Roboto400', 'left'), styles.subTitle]}>
            {'Title'}
          </Text>
          <InputBox
            refs={inputRef2}
            label={'Title'}
            value={input.title.value}
            onChangeText={text => {
              setInputs({
                ...input,
                title: {value: text, isError: false},
              });
            }}
            multiline
            textinputStyle={styles.contactNameTextInput1}
            outlineStyle={{
              borderColor: Colors.black,
            }}
            textColor={colors.text}
            theme={{
              colors: {
                onSurfaceVariant: colors.black,
                primary: colors.black,
              },
            }}
          />
        </View>
        <View style={styles.descptioinView}>
          <Text style={[textStyle(18, 'Roboto400', 'left'), styles.subTitle]}>
            {'Description'}
          </Text>
          <View>
            <InputBox
              refs={inputRef2}
              label={'Description'}
              value={input.desc.value}
              onChangeText={text => {
                setInputs({
                  ...input,
                  desc: {value: text, isError: false},
                });
              }}
              multiline
              textinputStyle={styles.contactNameTextInput}
              outlineStyle={{
                borderColor: Colors.black,
              }}
              onSubmitEditing={() => {
                console.log('on Submit Done');
              }}
              textColor={colors.text}
              theme={{
                colors: {
                  onSurfaceVariant: colors.black,
                  primary: colors.black,
                },
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.btnView}>
        <CommonButton
          buttonStyle={{marginBottom: 20, flex: 1}}
          title={'Cancle'}
          onPress={() => {
            props.navigation.goBack();
          }}
          isLoading={false}
          image_icons={'ic_cancel'}
        />
        <CommonButton
          buttonStyle={{marginBottom: 20, flex: 1}}
          title={'Save'}
          onPress={() => {
            onSubmitSignIn();
          }}
          isLoading={false}
          image_icons={'ic_save'}
        />
      </View>
    </View>
  );
};

export {ToDoScreen};
