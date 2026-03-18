import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '@/theme/commonStyles';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import FormInput from '@/components/FormInput';
import { ValidationRules } from '@/constants/formConstants';
import { useRegister } from '@/hooks/useRegister';

const styles = StyleSheet.create({
  container: commonStyles.containerCentered,
  title: commonStyles.titleLarge,
  input: commonStyles.input,
  error: commonStyles.error,
  button: commonStyles.button,
  buttonText: commonStyles.buttonText,
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.largest,
  },
  link: commonStyles.link,
});

export default function RegisterScreen() {
  const { control, handleSubmit, errors, isSubmitting, onSubmit, navigation } =
    useRegister();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View>
          <Text style={styles.title}>Register Form</Text>

          <FormInput
            control={control}
            name="name"
            rules={ValidationRules.name}
            placeholder="Enter full name"
            errors={errors}
            style={styles.input}
          />

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
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity
            style={[styles.button, isSubmitting && commonStyles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <View style={commonStyles.rowCenter}>
                <ActivityIndicator
                  size="small"
                  color={colors.white}
                  style={{ marginRight: spacing.lg }}
                />
                <Text style={styles.buttonText}>Creating user...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text>Already have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
