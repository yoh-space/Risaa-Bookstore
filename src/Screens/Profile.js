import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { themeColors } from '../Components/Utils/color';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Your profile details will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: themeColors.textSecondary,
  },
});
