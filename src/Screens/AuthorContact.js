import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';

export default function AuthorContact() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Author Contact</Text>
      <Text>Contact the author here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
});
