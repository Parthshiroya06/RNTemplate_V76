import {StyleSheet} from 'react-native';
import {responsiveHeight, responsiveWidth} from '@resources';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: 'black',
  },

  // Modal
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
  spacialReqView: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'column',
  },
  itemListView: {
    gap: 10,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  // Modal buttons
  btnSty: {
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    borderColor: '#ee7110',
  },
  btnImageSty: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  radiobtn: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },

  // Top horizontal indicator
  indicatorRow: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    zIndex: 10,
  },
  dot: {
    width: 35,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#888',
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 35,
    height: 8,
  },

  // Horizontal video container
  horizontalVideoContainer: {
    flex: 1,
  },
  videoWrapper: {
    width: responsiveWidth(100),
    height: '100%',
  },
});

export {styles};
