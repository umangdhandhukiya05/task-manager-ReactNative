import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { registerUser } from '@/api/userApi';

export default function RegisterScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      const response = await registerUser(data);

      if (response) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Registration failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Form</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Enter name"
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Enter email"
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password required',
          minLength: {
            value: 6,
            message: 'Minimum 6 characters',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Enter password"
            secureTextEntry
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Already have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#F5F5F5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },

  error: {
    color: '#D9534F',
    marginBottom: 10,
  },

  button: {
    height: 50,
    backgroundColor: '#FF7A00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  link: {
    color: '#FF7A00',
    fontWeight: '600',
  },
});
