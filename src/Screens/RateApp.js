import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RateApp() {
  return (
    <SafeAreaView style={styles.container}>
      <SystemBars style="light" />
      <Text style={styles.title}>Rate the App</Text>
      <Text>Let us know what you think!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
});
