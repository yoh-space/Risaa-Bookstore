import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { themeColors } from '../Utils/color';

const HelpSupport = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.header}>Help & Support</Text>
    <Text style={styles.text}>If you need assistance, please contact our support team at support@risaa.com or use the in-app chat. We are here to help you with any issues or questions.</Text>
    <Text style={styles.subHeader}>Common Issues</Text>
    <Text style={styles.text}>- Account access problems
- Payment and refund queries
- Book download issues
- App usage tips</Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: themeColors.backgroundDark,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: themeColors.primary,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 18,
    marginBottom: 8,
    color: themeColors.textPrimary,
  },
  text: {
    fontSize: 15,
    color: themeColors.textSecondary,
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default HelpSupport;
