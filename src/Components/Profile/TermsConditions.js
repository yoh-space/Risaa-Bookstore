import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { themeColors } from '../Utils/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TermsConditions = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 20, backgroundColor: themeColors.backgroundDark}}>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.backArrow}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={28} color={themeColors.textPrimary} />
    </TouchableOpacity>
    <Text style={styles.header}>Terms & Conditions</Text>
  </View>
    <ScrollView contentContainerStyle={{ flex: 1, padding: 20, backgroundColor: themeColors.backgroundDark }}>
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
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
  },
  backArrow: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: themeColors.backgroundDark,
    borderRadius: 16,
    padding: 4,
    shadowColor: themeColors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: themeColors.textPrimary,
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
