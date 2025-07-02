import {responsiveFont, responsiveHeight, responsiveWidth} from '@resources';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: responsiveWidth(5), // 5% margin on both sides
    paddingTop: responsiveHeight(2),
  },
  listContent: {
    paddingBottom: responsiveHeight(4),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    elevation: 3,
  },
  date: {
    fontSize: responsiveFont(12),
    fontWeight: '600',
    marginBottom: responsiveHeight(1),
  },
  items: {
    fontSize: responsiveFont(18),
    marginBottom: responsiveHeight(1),
    color: '#333',
  },
  total: {
    fontSize: responsiveFont(18),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
  },
  reorderBtn: {
    backgroundColor: '#007bff',
    paddingVertical: responsiveHeight(1),
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderText: {
    color: '#fff',
    fontSize: responsiveFont(15),
    fontWeight: '600',
  },
});

export {styles};
