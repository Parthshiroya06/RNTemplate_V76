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
    color: Colors.black,
    fontWeight: '600',
  },
  line: {
    marginHorizontal: 10,
    color: Colors.black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {styles};
