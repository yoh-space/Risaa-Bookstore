import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { themeColors } from '../Utils/color';

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

const FAQ = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.header}>Frequently Asked Questions</Text>
    {faqs.map((faq, idx) => (
      <View key={idx} style={styles.faqItem}>
        <Text style={styles.question}>{faq.question}</Text>
        <Text style={styles.answer}>{faq.answer}</Text>
      </View>
    ))}
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
