import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/style/authForm';
import FormInput from '@/components/FormInput';
import { ValidationRules } from '@/constants/formConstants';
import { useLogin } from '@/hooks/useLogin';

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit, errors, isSubmitting, onSubmit } =
    useLogin(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View>
          <Text style={styles.title}>Login form</Text>

          <FormInput
            control={control}
            name="email"
            rules={ValidationRules.email}
            placeholder="Enter email"
            errors={errors}
            keyboardType="email-address"
            style={styles.input}
          />

          <FormInput
            control={control}
            name="password"
            rules={ValidationRules.password}
            placeholder="Enter password"
            errors={errors}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={{ marginLeft: 8 }}
                />
                <Text style={styles.buttonText}>Signing in..</Text>
              </View>
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerBtn}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
