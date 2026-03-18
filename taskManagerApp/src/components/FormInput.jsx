import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { Controller } from 'react-hook-form';

export default function FormInput({
  control,
  name,
  rules,
  placeholder,
  errors,
  secureTextEntry = false,
  style,
  multiline = false,
  keyboardType = 'default',
  placeholderTextColor = '#888',
  editable = true,
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            style={[
              style,
              errors[name] && { borderColor: 'red', borderWidth: 1.5 },
            ]}
            multiline={multiline}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
            editable={editable}
          />
        )}
      />
      {errors[name] && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
          {errors[name].message}
        </Text>
      )}
    </View>
  );
}
