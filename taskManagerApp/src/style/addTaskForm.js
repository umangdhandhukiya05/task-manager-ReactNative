import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { padding: 20 },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    marginBottom: 6,
  },

  dropdown: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    marginBottom: 6,
  },

  dateBtn: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 14,
    marginBottom: 16,
  },

  dateText: { fontSize: 14 },

  button: {
    backgroundColor: '#FF7A00',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },

  errorInput: { borderColor: 'red' },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },

  calendarBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
  },

  closeBtn: {
    backgroundColor: '#FF7A00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});
