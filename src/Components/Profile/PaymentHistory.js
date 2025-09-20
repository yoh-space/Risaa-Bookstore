import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { themeColors } from '../Utils/color';

const payments = [
  // Example data, replace with real data from backend
  { id: 'TXN12345', date: '2025-09-01', amount: '₦1500', status: 'Completed' },
  { id: 'TXN12346', date: '2025-08-21', amount: '₦800', status: 'Refunded' },
  { id: 'TXN12347', date: '2025-08-10', amount: '₦2000', status: 'Completed' },
];

const PaymentHistory = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.header}>Payment History</Text>
    {payments.length === 0 ? (
      <Text style={styles.empty}>No payment history found.</Text>
    ) : (
      payments.map((txn) => (
        <View key={txn.id} style={styles.item}>
          <Text style={styles.txnId}>Transaction: {txn.id}</Text>
          <Text style={styles.detail}>Date: {txn.date}</Text>
          <Text style={styles.detail}>Amount: {txn.amount}</Text>
          <Text style={[styles.status, txn.status === 'Completed' ? styles.completed : styles.refunded]}>{txn.status}</Text>
        </View>
      ))
    )}
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
  item: {
    marginBottom: 18,
    padding: 14,
    borderRadius: 10,
    backgroundColor: themeColors.cardBackground,
    shadowColor: themeColors.cardShadow,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  txnId: {
    fontWeight: '600',
    color: themeColors.textPrimary,
    marginBottom: 4,
  },
  detail: {
    fontSize: 15,
    color: themeColors.textSecondary,
    marginBottom: 2,
  },
  status: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 15,
  },
  completed: {
    color: themeColors.success,
  },
  refunded: {
    color: themeColors.danger,
  },
  empty: {
    textAlign: 'center',
    color: themeColors.textMuted,
    fontSize: 16,
    marginTop: 40,
  },
});

export default PaymentHistory;
