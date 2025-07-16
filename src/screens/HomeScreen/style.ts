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
    top: 60,
    alignSelf: 'center',
    zIndex: 10,
  },
  dot: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#888',
  },
  activeDot: {
    backgroundColor: '#fff',
    flex: 1,
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
  videoBase: {
    backgroundColor: 'black',
    width: '100%',
  },
  leftControls: {
    position: 'absolute',
    width: responsiveWidth(15),
    right: 10,
    bottom: 180,

    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    marginBottom: 25,
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: 'white',
  },
  iconLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export {styles};
