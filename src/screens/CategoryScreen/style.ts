import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cattitleview: {
    backgroundColor: '#48a9f8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cattitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productList: {
    width: '95%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    elevation: 2,
  },
  imgview: {
    width: 60,
    height: 60,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  namepriceview: {
    flex: 1,
    justifyContent: 'center',
  },
  catTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  priceTxt: {
    fontSize: 13,
    marginTop: 4,
    color: '#555',
  },
});
