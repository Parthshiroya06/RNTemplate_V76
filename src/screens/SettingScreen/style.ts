import {Colors, responsiveHeight, responsiveWidth, textStyle} from '@resources';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: responsiveWidth(5),
    height: responsiveHeight(3),
    resizeMode: 'contain',
  },
  sectionHeader: {
    width: responsiveWidth(96),
    height: responsiveHeight(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  sectionView: {
    padding: 10,
    flexDirection: 'row',
    paddingTop: 20,
  },
  generalImageSty: {
    width: responsiveWidth(6),
    height: responsiveHeight(3),
    resizeMode: 'contain',
    marginHorizontal: responsiveWidth(2),
    // tintColor: 'black',
  },
  containerTheme: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appearanceView: {
    padding: 10,
    flexDirection: 'row',
    // borderBottomColor: '#ddd',
    alignSelf: 'flex-start',
  },
  themeText: {
    ...textStyle(18, 'Roboto', 'left'),
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  versionViewContainer: {
    flexDirection: 'row',
    // borderBottomColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: responsiveWidth(3),
  },
  versionViewTitle: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#ddd',
  },
  profileView: {width: responsiveWidth(70)},
  editProfileBtn: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImage: {
    width: responsiveWidth(5),
    height: responsiveHeight(5),
    resizeMode: 'contain',
  },
  profileViewModel: {
    alignItems: 'center',
  },
  selectedLngView: {
    paddingHorizontal: 20,
    paddingVertical: 5,

    borderRadius: 3,
  },
  languageView: {
    width: responsiveWidth(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileCloseIcon: {
    width: responsiveWidth(6),
    height: responsiveHeight(3),
  },
  contactNameTextInput: {
    marginTop: 10,
    height: responsiveHeight(5.5),
    borderRadius: 5,
    borderColor: Colors.blue,
  },
  profileClosebtn: {
    flexDirection: 'row',
    paddingLeft: responsiveWidth(1.5),
  },
  profileContaier: {
    position: 'absolute',
    bottom: 0,

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
  opacityView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay with 50% opacity
    zIndex: 1,
  },
  ProfileContainerView: {
    width: responsiveWidth(90),
    // alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: responsiveHeight(1.5),
    marginLeft: responsiveWidth(2),
  },
  labelView: {
    width: responsiveWidth(88),
  },
  modalContainer: {
    width: responsiveWidth(80),
    padding: responsiveHeight(2),
    backgroundColor: Colors.offWhite,
    borderRadius: 10,
    alignItems: 'center',
  },
  languageItem: {
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  languageText: {
    ...textStyle(12, 'Roboto200'),
    fontSize: 16,
    color: Colors.black,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  closeText: {
    ...textStyle(15, 'Roboto200'),
    color: Colors.red,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent overlay
  },
  title: {
    ...textStyle(18, 'Roboto400'),
    marginBottom: responsiveHeight(2),
    fontWeight: '700',
  },
});

export {styles};
