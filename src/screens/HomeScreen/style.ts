import {responsiveHeight, responsiveWidth} from '@resources';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexContainer: {flex: 1, backgroundColor: 'black'},
  profileContaier: {
    position: 'absolute',
    bottom: 20,

    alignItems: 'center',
    width: responsiveWidth(100),
    alignSelf: 'center',
    borderTopLeftRadius: responsiveWidth(2),
    borderTopRightRadius: responsiveWidth(2),
  },
  profileTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: responsiveWidth(95),
    marginTop: responsiveWidth(5),
    alignSelf: 'center',
  },
  profileClosebtn: {
    flexDirection: 'row',
    paddingLeft: responsiveWidth(1.5),
  },
  profileCloseIcon: {
    width: responsiveWidth(6),
    height: responsiveHeight(3),
  },
  profileViewModel: {
    alignItems: 'flex-start',
    marginTop: 10,
    width: responsiveWidth(85),
  },
});

export {styles};
