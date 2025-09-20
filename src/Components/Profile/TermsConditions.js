import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { themeColors } from '../Utils/color';

const TermsConditions = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.header}>Terms & Conditions</Text>
    <Text style={styles.text}>By using Risaa Bookstore, you agree to our terms and conditions. Please read them carefully before using the app.</Text>
    <Text style={styles.subHeader}>1. Account</Text>
    <Text style={styles.text}>You are responsible for maintaining the confidentiality of your account and password.</Text>
    <Text style={styles.subHeader}>2. Purchases</Text>
    <Text style={styles.text}>All purchases are final. Refunds are subject to our refund policy.</Text>
    <Text style={styles.subHeader}>3. Content Usage</Text>
    <Text style={styles.text}>Books and content are for personal use only. Redistribution is prohibited.</Text>
    <Text style={styles.subHeader}>4. Privacy</Text>
    <Text style={styles.text}>Your data is protected as per our privacy policy.</Text>
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
    fontSize: 17,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
    color: themeColors.textPrimary,
  },
  text: {
    fontSize: 15,
    color: themeColors.textSecondary,
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default TermsConditions;
