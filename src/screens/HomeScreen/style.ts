import {responsiveHeight, responsiveWidth} from '@resources';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  container: {
    flex: 1,
    padding: 16,

    backgroundColor: '#f5f5f5',
  },
  balanceText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#555',
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1c8d73',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
  },
  taskCard: {
    width: responsiveWidth(90),
    height: responsiveHeight(16),
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: '#1c8d73',
  },
  coinImageSty: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    resizeMode: 'contain',
  },
  plusImage: {
    width: responsiveWidth(4),
    height: responsiveHeight(3),
    resizeMode: 'contain',
  },
  taskCard: {
    width: responsiveWidth(90),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  taskSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export {styles};
