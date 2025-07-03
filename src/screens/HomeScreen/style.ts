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
  btnViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: responsiveWidth(25),
    marginTop: 10,
  },
  btnSty: {
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    borderColor: '#ee7110',
  },
  btnImageSty: {resizeMode: 'contain', width: 20, height: 20},
  radiobtn: {resizeMode: 'contain', width: 25, height: 25},
  spacialReqView: {marginLeft: 10, marginTop: 10, flexDirection: 'column'},
  itemListView: {
    gap: 10,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export {styles};
