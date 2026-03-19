import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useNetworkCheck from '@/hooks/useNetworkCheck';
import { commonStyles } from '@/theme/commonStyles';

export default function NoConection() {
  const isOffline = useNetworkCheck();

  if (!isOffline) return null;

  return (
    <View>
      <Text style={commonStyles.error}>No internet Conection</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
