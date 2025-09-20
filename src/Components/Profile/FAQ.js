import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { themeColors } from '../Utils/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'Go to Profile > Settings and select "Reset Password". Follow the instructions sent to your email.'
  },
  {
    question: 'How can I contact support?',
    answer: 'You can email support@risaa.com or use the Help & Support section in the app.'
  },
  {
    question: 'Where can I find purchased books?',
    answer: 'Purchased books are available in your Library tab.'
  },
];

const FAQ = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 20, backgroundColor: themeColors.backgroundDark}}>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.backArrow}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={28} color={themeColors.textPrimary} />
    </TouchableOpacity>
    <Text style={styles.header}>Frequently Asked Questions</Text>
  </View>
    <ScrollView contentContainerStyle={{ flex: 1, padding: 20, backgroundColor: themeColors.backgroundDark }}>
      {faqs.map((faq, idx) => (
        <View key={idx} style={styles.faqItem}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
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
  faqItem: {
    marginBottom: 18,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.cardBorder,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginBottom: 4,
  },
  answer: {
    fontSize: 15,
    color: themeColors.textSecondary,
    lineHeight: 22,
  },
});

export default FAQ;
