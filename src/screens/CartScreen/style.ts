import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 18,
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    width: 20,
    textAlign: 'center',
  },
  qty: {
    marginHorizontal: 10,
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeToggle: {
    backgroundColor: '#007bff',
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textBox: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    marginHorizontal: 20,
  },
  section: {
    marginBottom: 20,
    marginLeft: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 10,
  },
  radioSelected: {
    borderColor: '#007bff',
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 16,
  },
});

export {styles};
