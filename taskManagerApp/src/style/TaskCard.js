import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    maxWidth:"80%",
  },

  editBtn: {
    backgroundColor: '#FF7A00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  editText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  description: {
    marginTop: 6,
    color: '#555',
    fontSize: 14,
    maxWidth:"80%"
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  chip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
  },

  chipText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  dropdown: {
    marginTop: 10,
    width: 160,
    height: 36,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  dueDate: {
    marginTop: 10,
    fontSize: 12,
    color: '#888',
  },
});
