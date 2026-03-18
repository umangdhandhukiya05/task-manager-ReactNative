import React from 'react';
import { View, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';

export default function FormSelect({
  control,
  name,
  rules,
  options,
  errors,
  style,
  placeholder = 'Select option',
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            data={options}
            labelField="label"
            valueField="value"
            value={value}
            onChange={item => onChange(item.value)}
            placeholder={placeholder}
            style={[
              style,
              errors[name] && { borderColor: 'red', borderWidth: 1.5 },
            ]}
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
