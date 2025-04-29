import {Colors, responsiveHeight, responsiveWidth} from '@resources';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  textInputStyle: {
    height: responsiveHeight(10),
    borderRadius: 5,
    borderColor: Colors.blue,
  },
  contactNameTextInput: {
    marginTop: 5,
    height: responsiveHeight(5.5),
    borderRadius: 5,
    borderColor: Colors.blue,
  },
  labelView: {
    position: 'relative',
    width: responsiveWidth(85),
    height: responsiveHeight(2),
  },
  container1: {
    margin: 16,
    //zIndex: 9999, // important if used inside scroll
  },
  selectBox: {
    marginTop: 20,
    width: responsiveWidth(90),
    height: responsiveHeight(6),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  selectBoxText: {
    fontSize: 16,
    color: '#333',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  serviceItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  cancelButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});
