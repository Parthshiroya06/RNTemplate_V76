import {responsiveHeight, responsiveWidth, textStyle} from '@resources';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {CommonButton} from './CommonButton';
import {localize} from '@languages';
import {useTheme} from '@react-navigation/native';

const FeedFooter = ({data, onPress}) => {
  const {name, price} = data;
  console.log('dsfsdf', data);
  const followerCount = Math.floor(Math.random() * 20) + 1;
  const colors = useTheme().colors;
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={[textStyle(18, 'Roboto200', 'center'), {color: 'white'}]}>
          {name}
        </Text>
      </View>
      <Pressable
        style={[styles.flotButton, {backgroundColor: 'orange'}]}
        onPress={onPress}>
        <Text style={[styles.textStyles, {color: colors.offWhite}]}>
          {'Add to Cart'}
        </Text>
        <View
          style={{
            backgroundColor: '#ee7110',
            width: responsiveWidth(15),
            height: responsiveHeight(5.5),
            borderRadius: responsiveWidth(2),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={[
              textStyle(18, 'Roboto', 'center'),
              {color: colors.offWhite},
            ]}>
            {`$${price}`}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export {FeedFooter};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: responsiveHeight(20),
    marginLeft: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flotButton: {
    flexDirection: 'row',
    width: responsiveWidth(80),
    height: responsiveHeight(5.5),
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(1.5),
    paddingLeft: responsiveWidth(5),

    //backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  textStyles: {
    ...textStyle(18, 'Roboto'),
    // color: Colors.offWhite,
  },
});
