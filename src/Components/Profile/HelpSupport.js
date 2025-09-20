import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { themeColors } from '../Utils/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HelpSupport = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 20, backgroundColor: themeColors.backgroundDark}}>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.backArrow}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={28} color={themeColors.textPrimary} />
    </TouchableOpacity>
    <Text style={styles.header}>Help & Support</Text>
  </View>
    <ScrollView contentContainerStyle={{ flex: 1, padding: 20, backgroundColor: themeColors.backgroundDark }}>
      <Text style={styles.text}>If you need assistance, please contact our support team at support@risaa.com or use the in-app chat. We are here to help you with any issues or questions.</Text>
      <Text style={styles.subHeader}>Common Issues</Text>
      <Text style={styles.text}>- Account access problems
        - Payment and refund queries
        - Book download issues
        - App usage tips
    </Text>
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
    marginRight: 10,
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
    marginTop: 10,
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
