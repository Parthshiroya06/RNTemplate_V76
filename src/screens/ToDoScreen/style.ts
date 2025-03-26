import {Colors, responsiveHeight, responsiveWidth} from '@resources';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#64e1f2',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  title: {
    marginTop: 10,
    color: Colors.black,
    fontWeight: '700',
  },
  line: {
    marginHorizontal: 10,
    color: Colors.black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactNameTextInput: {
    //marginTop: 10,
    height: responsiveHeight(15),
    borderRadius: 5,
    //paddingVertical: 10,
    borderColor: Colors.blue,
  },
  contactNameTextInput1: {
    height: responsiveHeight(7),
    borderRadius: 5,
    fontSize: 14,
  },
  subTitle: {
    color: Colors.black,
    fontWeight: '700',
  },
  btnView: {
    gap: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  descptioinView: {
    justifyContent: 'flex-start',
    height: responsiveHeight(50),
    marginTop: 10,
    paddingVertical: 5,
  },
});

export {styles};
