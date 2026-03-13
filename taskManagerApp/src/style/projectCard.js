import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    maxWidth: '80%',
  },

  creator: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    marginBottom: 4,
  },

  description: {
    marginTop: 6,
    color: '#666',
    maxWidth: '80%',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  taskBtn: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },

  taskText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 13,
  },
  btn: {
    flexDirection: 'row',
    gap: 8,
  },
});
