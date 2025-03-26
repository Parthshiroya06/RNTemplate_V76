import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Colors, responsiveHeight, responsiveWidth, textStyle} from '@resources';
import {useTheme} from '@react-navigation/native';
import {images} from '@assets';

type Props = {
  buttonStyle?: any;
  onPress: () => void;
  title: string;
  TitleStyle?: any;
  isLoading?: boolean;
  image_icons: any;
};

const CommonButton = (props: Props) => {
  const colors = useTheme().colors;
  const {
    buttonStyle,
    image_icons,
    title,
    TitleStyle,
    onPress,
    isLoading = false,
  } = props;
  console.log('first,', image_icons);
  return (
    <Pressable
      style={[styles.flotButton, {backgroundColor: '#64e1f2'}, buttonStyle]}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={25} color={Colors.offWhite} />
      ) : (
        <View style={styles.row}>
          <Image source={images[image_icons]} style={[styles.rightIcons]} />

          <Text style={[styles.textStyles, {color: colors.text}, TitleStyle]}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export {CommonButton};

const styles = StyleSheet.create({
  flotButton: {
    width: responsiveWidth(90),
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(1.5),
    //backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyles: {
    ...textStyle(18, 'Roboto200'),
    color: Colors.offWhite,
  },
  rightIcons: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
    tintColor: Colors.green,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
